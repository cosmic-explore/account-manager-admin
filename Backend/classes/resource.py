from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import db
from uuid import UUID


class Resource(db.Model):
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    type: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)

    account_id: Mapped[UUID] = mapped_column(ForeignKey("account.id"), nullable=False)

    account = relationship("Account")
