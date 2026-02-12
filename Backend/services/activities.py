import logging

logging.basicConfig(level=logging.DEBUG)

from classes.base import db
from classes.activity import Activity


def get_all_activities():
    return Activity.get_all()


def create_activity(action, person_id, resource_id):
    activity = Activity(action, person_id, resource_id)
    db.session.add(activity)
    db.session.commit()


def get_activity_dict(activity):
    return {
        "id": activity.id,
        "action": activity.action,
        "person": activity.person.email,
        "resource": activity.resource.name,
        "resource_id": activity.resource_id,
        "timestamp": activity.created_at,
    }
