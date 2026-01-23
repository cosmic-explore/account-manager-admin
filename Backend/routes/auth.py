import logging

logging.basicConfig(level=logging.DEBUG)

from flask import request, Response, Blueprint
from flask_login import login_required, logout_user, current_user, login_user

# from app import login_manager
from classes.person import Person
from services.persons import validate_person

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


def load_person(person_id):
    return Person.get_by_id(person_id)


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return Response(status=418)

    request_data = request.get_json()

    person = Person.get_by_email(request_data["email"])
    if person is None or not validate_person(person, request_data["password"]):
        return Response(status=401)
    else:
        login_user(person)
        logging.info(f"SUCCESSFUL LOGIN FOR {person.email}")
        return Response(status=204)


@auth_bp.route("/logout", methods=["GET"])
@login_required
def logout():
    logging.info(f"LOGOUT {current_user.email}")
    logout_user()
    return Response(status=204)
