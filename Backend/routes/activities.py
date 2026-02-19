import logging


logging.basicConfig(level=logging.DEBUG)

from flask import Response, Blueprint, jsonify
from flask_login import login_required
from constants import HTTP_GET
from services.auth import admin_required
from services.activities import get_all_activities, get_activity_dict

activities_bp = Blueprint("activities", __name__, url_prefix="/activities")


@activities_bp.route("", methods=[HTTP_GET])
@login_required
@admin_required
def get_activities():
    activities_list = get_all_activities()
    return jsonify([get_activity_dict(person) for person in activities_list])
