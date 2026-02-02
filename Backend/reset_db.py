"""Run this script from the backend docker container"""

import logging

logging.basicConfig(level=logging.DEBUG)

import sqlalchemy as sa

from utility.hashing import Hasher
from classes import Person, Account, Resource, Activity
from app import app, db


def clear_tables():
    db.session.execute(sa.delete(Activity))
    db.session.execute(sa.delete(Resource))
    db.session.execute(sa.delete(Account))
    db.session.execute(sa.delete(Person))
    db.session.commit()


def seed_tables():
    password_hasher = Hasher()

    test_persons = [
        Person("admin@test.com", "admin", "p@ssword", password_hasher),
        Person("staff1@test.com", "staff", "p@ssword1", password_hasher),
        Person("staff2@test.com", "staff", "p@ssword2", password_hasher),
        Person("staff3@test.com", "staff", "p@ssword3", password_hasher),
    ]
    test_accounts = [Account("Account 1", "active"), Account("Account 2", "active")]

    # commit records with no foreign keys
    for record in [*test_persons, *test_accounts]:
        db.session.add(record)
    db.session.commit()

    test_resources = [
        Resource("horses", "livestock", "active", 100, test_accounts[0].id),
        Resource("cows", "livestock", "active", 100, test_accounts[0].id),
        Resource("chickens", "livestock", "active", 100, test_accounts[0].id),
        Resource("apples", "produce", "active", 100, test_accounts[1].id),
        Resource("oranges", "produce", "active", 100, test_accounts[1].id),
        Resource("bananas", "produce", "active", 100, test_accounts[1].id),
    ]

    for record in test_resources:
        db.session.add(record)
    db.session.commit()


with app.app_context():
    clear_tables()
    seed_tables()

logging.info("Database has been reset.")
