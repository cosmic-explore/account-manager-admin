"""Run this script from the Backend docker container"""

from app import app, db
from services.demo import reset_db

with app.app_context():
    reset_db(db)
