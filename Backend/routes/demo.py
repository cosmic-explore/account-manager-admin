from flask import Blueprint, Response
from constants import HTTP_POST
from classes.base import db
from services.demo import reset_db

demo_bp = Blueprint("demo", __name__, url_prefix="/demo")


@demo_bp.route("/reset", methods=[HTTP_POST])
def reset_demo_database():
    """Route that resets the database to a default state. Implemented for the app's live demo."""
    reset_db(db)
    return Response(status=204)
