from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import db
from uuid import UUID


class Activity(db.Model):
    action: Mapped[str] = mapped_column(nullable=False)

    person_id: Mapped[UUID] = mapped_column(ForeignKey("person.id"), nullable=False)
    resource_id: Mapped[UUID] = mapped_column(ForeignKey("resource.id"), nullable=False)

    person = relationship("Person")
    resource = relationship("Resource")

    def __init__(self, action, person_id, resource_id):
        self.action = action
        self.person_id = person_id
        self.resource_id = resource_id
