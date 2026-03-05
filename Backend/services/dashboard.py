from datetime import datetime, date, timedelta, timezone
from sqlalchemy import extract, select, func
from classes.base import db
from classes.account import Account
from classes.resource import Resource
from classes.activity import Activity
from services.accounts import get_account_dict
from services.resources import get_resource_dict
from services.activities import get_activity_dict


def get_summary():
    """Returns various account and resource related metrics"""
    date_cutoff = datetime.now(timezone.utc) - timedelta(days=30)

    account_summary = db.session.execute(
        select(
            func.count(Account.id).label("total_accounts"),
            func.count(Account.id)
            .filter(Account.status == "active")
            .label("active_accounts"),
            func.count(Account.id)
            .filter(Account.created_at >= date_cutoff)
            .label("new_accounts"),
        )
    ).one()

    resource_summary = db.session.execute(
        select(
            func.count(Resource.id).label("total_resources"),
            func.sum(Resource.quantity)
            .filter(Resource.name == "Storage")
            .label("total_storage_allocation"),
            func.count(Resource.id)
            .filter(Resource.created_at >= date_cutoff)
            .label("new_resources"),
        )
    ).one()

    return {
        **account_summary._asdict(),
        **resource_summary._asdict(),
    }


def get_account_growth():
    """returns accounts grouped by creation date for the last year"""
    new_accounts_by_month = []

    def get_accounts_of_prev_month(target_month, target_year, months_back):
        if months_back > 11:
            return
        else:
            month_count = db.session.scalars(
                select(func.count())
                .select_from(Account)
                .where(
                    extract("month", Account.created_at) == target_month,
                    extract("year", Account.created_at) == target_year,
                )
            ).one()

            new_accounts_by_month.append(
                {"month": target_month, "year": target_year, "count": month_count}
            )

            months_back += 1
            get_accounts_of_prev_month(
                *get_previous_month(target_month, target_year), months_back
            )

    current_date = date.today()
    get_accounts_of_prev_month(current_date.month, current_date.year, 0)

    return new_accounts_by_month


def get_resource_distribution():
    """returns the count of resources by type"""
    resources = db.session.execute(
        select(Resource.type, func.count(Resource.id).label("count")).group_by(
            Resource.type
        )
    ).all()
    return [row._asdict() for row in resources]


def get_alerts():
    """Returns accounts and resources with need for oversight"""
    date_cutoff = datetime.now(timezone.utc) - timedelta(days=30)

    # accounts of which no resources have been updated in the last 30 days
    accounts_stale_resources = db.session.scalars(
        select(Account)
        .where(Account.resources.any(Resource.modified_at <= date_cutoff))
        .where(
            Account.resources.any(Resource.account_id == Account.id)
        )  # don't show accounts without resources here
    ).all()
    # accounts without resources
    accounts_no_resources = db.session.scalars(
        select(Account).where(~Account.resources.any())
    ).all()
    # resources whose quantity is 0
    resources_no_quantity = db.session.scalars(
        select(Resource).where(Resource.quantity <= 0)
    ).all()

    return {
        "accounts_stale_resources": [
            get_account_dict(a) for a in accounts_stale_resources
        ],
        "accounts_no_resources": [get_account_dict(a) for a in accounts_no_resources],
        "resources_no_quantity": [get_resource_dict(r) for r in resources_no_quantity],
    }


def get_recent_activity():
    """returns the 10 most recent activities"""
    recentmost_activities = db.session.scalars(
        select(Activity).order_by(Activity.created_at.desc()).limit(10)
    ).all()
    return [get_activity_dict(a) for a in recentmost_activities]


def get_previous_month(month, year):
    # helper func that takes month and year as ints
    if month == 1:
        return 12, year - 1
    else:
        return month - 1, year
