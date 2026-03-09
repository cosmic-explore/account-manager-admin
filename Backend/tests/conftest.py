from freezegun import freeze_time
import pytest
from sqlalchemy.orm import Session
from tests.factories.account_factory import AccountFactory
from app import create_app
from classes.base import db


@pytest.fixture(scope="session")
def app():
    app = create_app(
        config_override={
            "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        }
    )

    with app.app_context():
        yield app


@pytest.fixture(scope="session")
def database(app):
    db.create_all()
    yield
    db.drop_all()


@pytest.fixture(scope="function")
def db_session(database):
    connection = db.engine.connect()
    transaction = connection.begin()

    yield db.session

    transaction.rollback()
    connection.close()
    db.session.remove()


@pytest.fixture(scope="function")
def single_account(db_session):
    account = AccountFactory()
    db_session.add(account)
    db_session.flush()
    return account


@pytest.fixture(scope="function")
def frozen_time():
    with freeze_time("2026-01-01"):
        yield
