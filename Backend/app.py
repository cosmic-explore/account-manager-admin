import logging

logging.basicConfig(level=logging.DEBUG)

import os
from flask import Flask
from extensions import bcrypt, login_manager
from classes.base import db
from routes import accounts_bp, activities_bp, auth_bp, persons_bp, resources_bp

app = Flask(__name__)

# flask config
app.secret_key = os.environ.get("FLASK_SECRET_KEY")

# sqlalchemy config
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URI")
db.init_app(app)

# extension config
login_manager.init_app(app)
bcrypt.init_app(app)

# configure cors
# TODO: add env variable for frontend cors origin
# from flask_cors import CORS
# CORS(
#     app, origins=[*os.environ.get("CORS_ORIGIN").split(",")], supports_credentials=True
# )

# register route endpoints
app.register_blueprint(accounts_bp)
app.register_blueprint(activities_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(persons_bp)
app.register_blueprint(resources_bp)

if __name__ == "__main__":
    # for running the app without guinicorn in development
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
