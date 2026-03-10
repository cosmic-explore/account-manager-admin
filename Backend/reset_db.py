"""Run this script from the Backend docker container"""

from app import factory
from classes.base import db
from services.demo import reset_db

app = factory.create_app()

with app.app_context():
    reset_db(db)
