from sqlalchemy.orm import Mapped, mapped_column
from .base import db
from sqlalchemy import select
from flask_login import UserMixin
from extensions import login_manager


class Person(UserMixin, db.Model):
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    role: Mapped[str] = mapped_column(nullable=False)
    passhash: Mapped[str] = mapped_column(nullable=False)

    def __init__(self, email, role, password, hasher):
        self.email = email
        self.role = role
        self.passhash = hasher.hash(password)

    @login_manager.user_loader
    def get_by_id(id):
        return db.session.scalars(select(Person).where(Person.id == id)).one_or_none()

    def get_by_email(email):
        return db.session.scalars(
            select(Person).where(Person.email == email)
        ).one_or_none()
