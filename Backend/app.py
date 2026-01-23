import logging

logging.basicConfig(level=logging.DEBUG)

import os
from flask import Flask
from flask_bcrypt import Bcrypt
from classes.base import db

app = Flask(__name__)

# configure flask app
app.secret_key = os.environ.get("FLASK_SECRET_KEY")
bcrypt = Bcrypt(app)

# configure sqlalchemy
# docker adds "database" to the DNS
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URI")
db.init_app(app)

# configure cors
# TODO: add env variable for frontend cors origin
# from flask_cors import CORS
# CORS(
#     app, origins=[*os.environ.get("CORS_ORIGIN").split(",")], supports_credentials=True
# )

if __name__ == "__main__":
    # for running the app without guinicorn in development
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
