import sqlalchemy as sa
from datetime import date
from classes import Person, Account, Resource, Activity
from utility.hashing import Hasher
import logging

logging.basicConfig(level=logging.DEBUG)


def clear_tables(db):
    db.session.execute(sa.delete(Activity))
    db.session.execute(sa.delete(Resource))
    db.session.execute(sa.delete(Account))
    db.session.execute(sa.delete(Person))
    db.session.commit()


def set_create_date(record, date):
    record.created_at = date
    record.modified_at = date


def month_minus_n(year, month_num, n):
    # returns the month n months before the given month
    if month_num - n < 1:
        return year - 1, 12 - (n - month_num)
    else:
        return year, month_num - n


month_dist_table = [10, 7, 5, 3, 2, 2, 1, 0, 0, 0]

resource_archtypes = [
    {"name": "Storage", "type": "tech", "quantity": 1000, "unit": "GB"},
    {"name": "Compute", "type": "tech", "quantity": 200, "unit": "hours"},
    {"name": "Seats", "type": "license", "quantity": 4, "unit": ""},
    {"name": "Credit", "type": "asset", "quantity": 500, "unit": "USD"},
    {"name": "Support Tickets", "type": "quota", "quantity": 20, "unit": ""},
    {"name": "Agent Time", "type": "support", "quantity": 40, "unit": "hours"},
    {"name": "API Requests", "type": "quota", "quantity": 1000, "unit": ""},
]


def seed_tables(db):
    password_hasher = Hasher()

    test_persons = [
        Person("admin@test.com", "admin", "p@ssword", password_hasher),
        Person("staff1@test.com", "staff", "p@ssword1", password_hasher),
        Person("staff2@test.com", "staff", "p@ssword2", password_hasher),
        Person("staff3@test.com", "staff", "p@ssword3", password_hasher),
    ]
    test_accounts = [Account(f"Account {i}", "active") for i in range(1, 11)]

    # create a distrubution for account creation dates
    # always use the first of the month for simplicity
    today = date.today()
    current_month = today.month
    current_year = today.year
    for i, account in enumerate(test_accounts):
        year, month = month_minus_n(current_year, current_month, month_dist_table[i])
        set_create_date(
            account,
            date(year, month, 1),
        )

    # set some accounts to "suspended"
    for i in [3, 7]:
        test_accounts[i].status = "suspended"

    # commit records with no foreign keys
    for record in [*test_persons, *test_accounts]:
        db.session.add(record)
    db.session.commit()

    test_resources = []

    for account in test_accounts:
        account_resources = []
        for resource in resource_archtypes:
            account_resources.append(
                Resource(
                    resource["name"],
                    resource["type"],
                    "active",
                    resource["quantity"],
                    account.id,
                    unit=resource["unit"],
                )
            )
        test_resources.extend(account_resources)

    # mess with resources to produce interesting analytics

    no_resouces_account_id = test_accounts[4].id
    test_resources = [
        r for r in test_resources if r.account_id != no_resouces_account_id
    ]

    for i in [14, 15, 37]:
        test_resources[i].quantity = 0

    stale_resources_account_id = test_accounts[2].id
    for r in [r for r in test_resources if r.account_id == stale_resources_account_id]:
        set_create_date(r, test_accounts[2].created_at)

    # add resources to the db
    for record in test_resources:
        db.session.add(record)
    db.session.commit()


def reset_db(db):
    clear_tables(db)
    seed_tables(db)
    logging.info("Database has been reset.")
