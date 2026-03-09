import logging

logging.basicConfig(level=logging.DEBUG)

import os
from flask import Flask
from flask_cors import CORS
from extensions import bcrypt, login_manager
from classes.base import db
from routes import (
    accounts_bp,
    activities_bp,
    auth_bp,
    persons_bp,
    resources_bp,
    dashboard_bp,
    demo_bp,
)


def create_app(config_override=None):
    app = Flask(__name__)

    # flask config
    app.secret_key = os.environ.get("FLASK_SECRET_KEY")

    # sqlalchemy config
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URI")

    # configure cors
    app.config["SESSION_COOKIE_SAMESITE"] = "None"  # Allow cross-origin cookies
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["CORS_ORIGIN"] = os.environ.get("CORS_ORIGIN", "http://localhost")
    CORS(
        app,
        origins=[*app.config["CORS_ORIGIN"].split(",")],
        supports_credentials=True,
    )

    # register route endpoints
    app.register_blueprint(accounts_bp)
    app.register_blueprint(activities_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(persons_bp)
    app.register_blueprint(resources_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(demo_bp)

    if config_override:
        app.config.update(config_override)

    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)

    return app
