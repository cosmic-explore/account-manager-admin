import logging

logging.basicConfig(level=logging.DEBUG)

from classes.base import db
from classes.activity import Activity


def get_all_activities():
    """Returns a list of all activities in the DB."""
    return Activity.get_all()


def create_activity(action, person_id, resource_id):
    """Creates a new activity in the DB with the given parameters."""
    activity = Activity(action, person_id, resource_id)
    db.session.add(activity)
    db.session.commit()


def get_activity_dict(activity):
    """Returns a dict representation of the given Activity class object."""
    return {
        "id": activity.id,
        "action": activity.action,
        "person": activity.person.email,
        "resource": activity.resource.name,
        "resource_id": activity.resource_id,
        "account_id": activity.resource.account_id,
        "account_name": activity.resource.account.name,
        "timestamp": activity.created_at,
    }
