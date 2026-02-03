import logging

logging.basicConfig(level=logging.DEBUG)

from flask import request, Response, Blueprint, jsonify
from flask_login import login_required
from services.auth import admin_required
from services.accounts import (
    get_all_accounts,
    get_account,
    get_resources,
    create_account,
    update_account,
    get_account_dict,
)
from services.resources import get_resource_dict

ACCOUNT_MUTABLE_PROPERTIES = ["name", "status"]


accounts_bp = Blueprint("accounts", __name__, url_prefix="/accounts")


@accounts_bp.route("/", methods=["GET"])
@login_required
@admin_required
def get_accounts():
    accounts_list = get_all_accounts()
    return jsonify([get_account_dict(account) for account in accounts_list])


@accounts_bp.route("/<id>/resources", methods=["GET"])
@login_required
def get_account_resources(id):
    resources = get_resources(id)
    return jsonify([get_resource_dict(resource) for resource in resources])


@accounts_bp.route("/", methods=["POST"])
@login_required
@admin_required
def post_account():
    request_data = request.get_json()
    new_account = create_account(request_data["name"], request_data["status"])
    return jsonify(get_account_dict(new_account))


@accounts_bp.route("/<id>", methods=["PATCH"])
@login_required
@admin_required
def patch_account(id):
    account = get_account(id)
    update_account(account, request.get_json(), ACCOUNT_MUTABLE_PROPERTIES)
    return jsonify(get_account_dict(account))
