from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class Person(db.Model):
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    role: Mapped[str] = mapped_column(nullable=False)
