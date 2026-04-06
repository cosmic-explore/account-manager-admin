import logging

from flask import Blueprint, jsonify
from services.dashboard import (
    get_account_growth,
    get_alerts,
    get_recent_activity,
    get_resource_distribution,
    get_summary,
)
from flask_login import login_required
from constants import HTTP_GET


logging.basicConfig(level=logging.DEBUG)


dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")


@dashboard_bp.route("", methods=[HTTP_GET])
@login_required
def get_dashboard_stats():
    """Returns the stats displayed by the frontend's dashboard in JSON format"""
    return jsonify(
        {
            "summary": get_summary(),
            "account_growth": get_account_growth(),
            "resource_distribution": get_resource_distribution(),
            "alerts": get_alerts(),
            "recent_activity": get_recent_activity(),
        }
    )
