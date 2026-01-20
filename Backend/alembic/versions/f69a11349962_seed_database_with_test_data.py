"""seed database with test data

Revision ID: f69a11349962
Revises: 81d9751752ef
Create Date: 2026-01-19 22:38:10.279965

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "f69a11349962"
down_revision: Union[str, Sequence[str], None] = "81d9751752ef"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema.
    NOTE: Typically, I would not add test records in a migration, but for a small project this makes it easy to reset the database to a basic state.
    """
    connection = op.get_bind()
    person = sa.table(
        "person",
        sa.column("email", sa.String),
        sa.column("role", sa.String),
    )
    account = sa.table(
        "account",
        sa.column("id", sa.String),
        sa.column("name", sa.String),
        sa.column("status", sa.String),
    )

    resource = sa.table(
        "resource",
        sa.column("name", sa.String),
        sa.column("type", sa.String),
        sa.column("status", sa.String),
        sa.column("account_id", sa.Integer),
    )

    connection.execute(
        sa.insert(person),
        [
            {"email": "admin@test.com", "role": "admin"},
            {"email": "staff1@test.com", "role": "staff"},
            {"email": "staff2@test.com", "role": "staff"},
            {"email": "staff3@test.com", "role": "staff"},
        ],
    )

    account_results = connection.execute(
        sa.insert(account).returning(account.c.id, account.c.name),
        [
            {"name": "Account 1", "status": "active"},
            {"name": "Account 2", "status": "archived"},
        ],
    )

    account_ids = {row.name: row.id for row in account_results}

    connection.execute(
        sa.insert(resource),
        [
            {
                "name": "horses",
                "type": "livestock",
                "status": "active",
                "account_id": account_ids["Account 1"],
            },
            {
                "name": "cows",
                "type": "livestock",
                "status": "active",
                "account_id": account_ids["Account 1"],
            },
            {
                "name": "chickens",
                "type": "livestock",
                "status": "active",
                "account_id": account_ids["Account 1"],
            },
            {
                "name": "apples",
                "type": "produce",
                "status": "active",
                "account_id": account_ids["Account 2"],
            },
            {
                "name": "oranges",
                "type": "produce",
                "status": "active",
                "account_id": account_ids["Account 2"],
            },
            {
                "name": "bananas",
                "type": "produce",
                "status": "active",
                "account_id": account_ids["Account 2"],
            },
        ],
    )


def downgrade() -> None:
    """Downgrade schema."""
    # remove data from all tables
    connection = op.get_bind()
    connection.execute(sa.delete(sa.table("resource")))
    connection.execute(sa.delete(sa.table("account")))
    connection.execute(sa.delete(sa.table("person")))
