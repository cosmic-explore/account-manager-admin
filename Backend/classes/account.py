from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import db


class Account(db.Model):
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    status: Mapped[str] = mapped_column(nullable=False)

    resources = relationship("Resource", back_populates="account")

    def __init__(self, name, status):
        self.name = name
        self.status = status
