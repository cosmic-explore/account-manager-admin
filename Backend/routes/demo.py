from flask import Blueprint, Response
from sqlalchemy import text
from constants import HTTP_GET, HTTP_POST
from classes.base import db
from services.seeding import reset_db

demo_bp = Blueprint("demo", __name__, url_prefix="/demo")


@demo_bp.route("/reset", methods=[HTTP_POST])
def reset_demo_database():
    """Route that resets the database to a default state. Implemented for the app's live demo."""
    reset_db(db)
    return Response(status=204)


@demo_bp.route("/ping", methods=[HTTP_GET])
def ping_database():
    """Allows the demo database to be pinged to ensure that it's running"""
    # only let the endpoint run if it's using the cron job's secret
    # in a non-demo app, restrict access to this endpoint with a custom header
    db.session.execute(text("SELECT 1"))
    return Response(status=204)
