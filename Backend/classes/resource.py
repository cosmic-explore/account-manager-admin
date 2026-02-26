from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import db
from uuid import UUID


class Resource(db.Model):
    name: Mapped[str] = mapped_column(nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)
    unit: Mapped[str] = mapped_column(nullable=True)

    account_id: Mapped[UUID] = mapped_column(ForeignKey("account.id"), nullable=False)

    account = relationship("Account")

    def __init__(self, name, type, status, quantity, account_id, unit=None):
        self.name = name
        self.type = type
        self.status = status
        self.quantity = quantity
        self.unit = unit
        self.account_id = account_id
