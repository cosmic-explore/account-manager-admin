from tests.factories.base_factory import BaseFactory
from classes.resource import Resource
from classes.base import db


class ResourceFactory(BaseFactory):
    class Meta:
        model = Resource
        sqlalchemy_session = db.session

    name = "test resource"
    type = "test type"
    quantity = 100
    status = "active"
    account_id = None
