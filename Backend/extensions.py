"""Loads app extensions. This file is imported during app setup by app/factory.py"""

from flask_login import LoginManager
from flask_bcrypt import Bcrypt

login_manager = LoginManager()
bcrypt = Bcrypt()
