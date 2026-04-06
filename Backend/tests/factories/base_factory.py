from datetime import date

import factory
from classes.base import db


class BaseFactory(factory.alchemy.SQLAlchemyModelFactory):
    """Abstract class to create mock objects for testing, inherited by other factory classes"""

    class Meta:
        abstract = True
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "flush"

    @factory.post_generation
    def created_at(obj, create, extracted, **kwargs):
        if extracted:
            obj.created_at = extracted
        else:
            obj.created_at = date(2026, 1, 1)

    @factory.post_generation
    def modified_at(obj, create, extracted, **kwargs):
        if extracted:
            obj.modified_at = extracted
        else:
            obj.modified_at = date(2026, 1, 1)
