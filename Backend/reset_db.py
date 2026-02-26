"""Run this script from the backend docker container"""

import logging

logging.basicConfig(level=logging.DEBUG)

import sqlalchemy as sa

from datetime import date
from utility.hashing import Hasher
from classes import Person, Account, Resource, Activity
from app import app, db


def clear_tables():
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


month_dist_table = [0, 0, 0, 1, 2, 2, 3, 5, 7, 10]

resource_archtypes = [
    {"name": "Storage", "type": "tech", "quantity": 1000, "unit": "GB"},
    {"name": "Compute", "type": "tech", "quantity": 200, "unit": "hours"},
    {"name": "Seats", "type": "license", "quantity": 4, "unit": ""},
    {"name": "Credit", "type": "asset", "quantity": 500, "unit": "USD"},
    {"name": "Support Tickets", "type": "quota", "quantity": 20, "unit": ""},
    {"name": "Agent Time", "type": "support", "quantity": 40, "unit": "hours"},
    {"name": "API Requests", "type": "quota", "quantity": 1000, "unit": ""},
]


def seed_tables():
    password_hasher = Hasher()

    test_persons = [
        Person("admin@test.com", "admin", "p@ssword", password_hasher),
        Person("staff1@test.com", "staff", "p@ssword1", password_hasher),
        Person("staff2@test.com", "staff", "p@ssword2", password_hasher),
        Person("staff3@test.com", "staff", "p@ssword3", password_hasher),
    ]
    test_accounts = [Account(f"Account {i}", "active") for i in range(1, 10)]

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

    for record in test_resources:
        db.session.add(record)
    db.session.commit()


with app.app_context():
    clear_tables()
    seed_tables()

logging.info("Database has been reset.")
