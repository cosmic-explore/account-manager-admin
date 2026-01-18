from sqlalchemy import UUID, text, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4, UUID
from datetime import datetime


class Base(DeclarativeBase):
    """The Base class model that all the other SQLAlchemy models in the app inherit"""

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=lambda: uuid4(),
        server_default=text("uuid_generate_v4()"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    modified_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), server_onupdate=func.now()
    )


db = SQLAlchemy(model_class=Base)
