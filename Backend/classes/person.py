from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class Person(db.Model):
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    role: Mapped[str] = mapped_column(nullable=False)
    passhash: Mapped[str] = mapped_column(nullable=False)

    def __init__(self, email, role, password, hasher):
        self.email = email
        self.role = role
        self.passhash = hasher.hash(password)
