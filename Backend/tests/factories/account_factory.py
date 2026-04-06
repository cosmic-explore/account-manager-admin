from tests.factories.base_factory import BaseFactory
from classes.account import Account
from classes.base import db


class AccountFactory(BaseFactory):
    """Class to create mock Account objects for testing"""

    class Meta:
        model = Account
        sqlalchemy_session = db.session

    name = "test account"
    status = "active"
