from datetime import date
from tests.factories.resource_factory import ResourceFactory
from tests.factories.account_factory import AccountFactory
from services.dashboard import (
    get_summary,
    get_resource_distribution,
    get_account_growth,
    get_alerts,
)


class TestSummary:
    def test_total_accounts(self, db_session):
        AccountFactory()
        summary = get_summary()
        assert summary["total_accounts"] == 1

    def test_active_accounts(self, db_session):
        AccountFactory(name="account_1", status="active")
        AccountFactory(name="account_2", status="suspended")
        summary = get_summary()
        assert summary["active_accounts"] == 1

    def test_new_accounts(self, db_session, frozen_time):
        # tests the date boundary
        AccountFactory(name="account_1", created_at=date(2025, 12, 2))
        AccountFactory(name="account_2", created_at=date(2025, 12, 1))
        summary = get_summary()
        assert summary["new_accounts"] == 1

    def test_total_resources(self, single_account):
        ResourceFactory(account_id=single_account.id)
        ResourceFactory(account_id=single_account.id)
        summary = get_summary()
        assert summary["total_resources"] == 2

    def test_total_storage_allocation(self, db_session):
        account_1 = AccountFactory(name="account_1")
        account_2 = AccountFactory(name="account_2")
        db_session.add(account_1)
        db_session.flush()
        ResourceFactory(name="Storage", quantity=100, account_id=account_1.id)
        ResourceFactory(name="Storage", quantity=100, account_id=account_2.id)
        summary = get_summary()
        assert summary["total_storage_allocation"] == 200

    def test_new_resources(self, single_account, frozen_time):
        # tests the date boundary
        ResourceFactory(account_id=single_account.id, created_at=date(2025, 12, 2))
        ResourceFactory(account_id=single_account.id, created_at=date(2025, 12, 1))
        summary = get_summary()
        assert summary["new_resources"] == 1

    def test_empty_system(self):
        summary = get_summary()
        assert summary == {
            "total_accounts": 0,
            "active_accounts": 0,
            "new_accounts": 0,
            "total_resources": 0,
            "total_storage_allocation": 0,
            "new_resources": 0,
        }


class TestAccountGrowth:
    def test_account_growth(self, db_session, frozen_time):
        AccountFactory(name="account_1", created_at=date(2026, 1, 1))
        AccountFactory(name="account_2", created_at=date(2025, 12, 1))
        AccountFactory(name="account_3", created_at=date(2025, 12, 15))
        AccountFactory(name="account_4", created_at=date(2025, 10, 1))
        AccountFactory(name="account_5", created_at=date(2025, 3, 15))
        account_growth = get_account_growth()
        growth_dict = {bucket["month"]: bucket["count"] for bucket in account_growth}
        for month_num in range(1, 13):
            if month_num in [1, 10, 3]:
                assert growth_dict[month_num] == 1
            elif month_num == 12:
                assert growth_dict[month_num] == 2
            else:
                assert growth_dict[month_num] == 0


class TestResourceDistribution:
    def test_resource_distribution(self, single_account):
        ResourceFactory(type="a", account_id=single_account.id)
        ResourceFactory(type="b", account_id=single_account.id)
        ResourceFactory(type="b", account_id=single_account.id)
        ResourceFactory(type="c", account_id=single_account.id)
        resource_dist = get_resource_distribution()
        assert {"type": "a", "count": 1} in resource_dist
        assert {"type": "b", "count": 2} in resource_dist
        assert {"type": "c", "count": 1} in resource_dist


class TestAlerts:
    def test_accounts_stale_resources(self, db_session, frozen_time):
        account_1 = AccountFactory(name="account_1")
        account_2 = AccountFactory(name="account_2")
        db_session.add(account_1, account_2)
        db_session.flush()
        ResourceFactory(account_id=account_1.id, modified_at=date(2025, 1, 1))
        ResourceFactory(account_id=account_2.id)
        accounts_stale_resources = get_alerts()["accounts_stale_resources"]
        assert len(accounts_stale_resources) == 1
        assert accounts_stale_resources[0]["name"] == "account_1"

    def test_accounts_no_resources(self, db_session):
        account_1 = AccountFactory(name="account_1")
        account_2 = AccountFactory(name="account_2")
        db_session.add(account_1, account_2)
        db_session.flush()
        ResourceFactory(account_id=account_2.id)
        accounts_no_resources = get_alerts()["accounts_no_resources"]
        assert len(accounts_no_resources) == 1
        assert accounts_no_resources[0]["name"] == "account_1"

    def test_resources_no_quantity(self, single_account):
        ResourceFactory(
            name="the one with no quantity", quantity=0, account_id=single_account.id
        )
        ResourceFactory(account_id=single_account.id)
        resources_no_quantity = get_alerts()["resources_no_quantity"]
        assert len(resources_no_quantity) == 1
        assert resources_no_quantity[0]["name"] == "the one with no quantity"

    def test_no_alerts(self, single_account, frozen_time):
        ResourceFactory(account_id=single_account.id)
        alerts = get_alerts()
        assert alerts["accounts_stale_resources"] == []
        assert alerts["accounts_no_resources"] == []
        assert alerts["resources_no_quantity"] == []
