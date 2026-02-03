import logging

logging.basicConfig(level=logging.DEBUG)

from flask import request, Response, Blueprint, jsonify
from flask_login import login_required, current_user
from services.auth import admin_required
from services.persons import get_person_dict, get_all_persons, create_person
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation


persons_bp = Blueprint("persons", __name__, url_prefix="/persons")


@persons_bp.route("/me", methods=["GET"])
@login_required
def get_current_person():
    return jsonify(get_person_dict(current_user))


@persons_bp.route("/", methods=["GET"])
@login_required
@admin_required
def get_persons():
    persons_list = get_all_persons()
    return jsonify([get_person_dict(person) for person in persons_list])


@persons_bp.route("/", methods=["POST"])
@login_required
@admin_required
def post_person():
    request_data = request.get_json()
    try:
        create_person(
            request_data["email"], request_data["role"], request_data["password"]
        )
    except IntegrityError as e:
        if isinstance(e.orig, UniqueViolation):
            return Response("Cannot create user: email already in use", status=409)
    return Response(status=204)
