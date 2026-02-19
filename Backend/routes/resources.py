import logging

logging.basicConfig(level=logging.DEBUG)

import traceback
from functools import wraps
from flask import Response, request, Blueprint, jsonify, g
from flask_login import login_required, current_user
from constants import (
    CREATE_RESOURCE,
    HTTP_GET,
    HTTP_PATCH,
    HTTP_POST,
    UPDATE_RESOURCE,
)
from services.auth import admin_required
from services.resources import (
    get_all_resources,
    get_resource,
    create_resource,
    update_resource,
    get_resource_dict,
)
from services.activities import create_activity


resources_bp = Blueprint("resources", __name__, url_prefix="/resources")

### Hooks and Decorators


@resources_bp.after_request
def log_activity_hook(response):
    """Logs activities on Resource objects"""
    if not hasattr(g, "activity_action") or not current_user.is_authenticated:
        return response

    if 200 <= response.status_code < 300:
        try:
            resource_id = getattr(g, "resource_id")
            create_activity(g.activity_action, current_user.id, resource_id)
        except Exception:
            logging.error("Failed to log activity:")
            traceback.print_exc()
            return response
    return response


def log_activity(action):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            g.activity_action = action
            if action == UPDATE_RESOURCE:
                g.resource_id = kwargs.get("id")
            return func(*args, **kwargs)

        return wrapper

    return decorator


### Routes


@resources_bp.route("", methods=[HTTP_GET])
@login_required
@admin_required
def get_resources():
    resources_list = get_all_resources()
    return jsonify([get_resource_dict(resource) for resource in resources_list])


@resources_bp.route("", methods=[HTTP_POST])
@login_required
@admin_required
@log_activity(CREATE_RESOURCE)
def post_resource():
    request_data = request.get_json()
    new_resource = create_resource(
        request_data["name"],
        request_data["type"],
        request_data["status"],
        request_data["quantity"],
        request_data["account_id"],
    )
    # record the resource id for the activity log
    g.resource_id = new_resource.id
    return jsonify(get_resource_dict(new_resource))


@resources_bp.route("/<id>", methods=[HTTP_PATCH])
@login_required
@log_activity(UPDATE_RESOURCE)
def patch_resource(id):
    resource = get_resource(id)
    update_resource(resource, request.get_json())
    return jsonify(get_resource_dict(resource))
