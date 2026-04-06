from classes.base import db
from classes.resource import Resource

RESOURCE_MUTABLE_PROPERTIES = ["name", "type", "status", "quantity", "unit"]


def get_all_resources():
    """Returns all resources in the DB"""
    return Resource.get_all()


def get_resource(id):
    """Returns the resource with given id from the DB"""
    return Resource.get_by_id(id)


def create_resource(name, type, status, quantity, account_id, unit):
    """Creates a Resource in the DB with the given parameters"""
    resource = Resource(name, type, status, quantity, account_id, unit=unit)
    db.session.add(resource)
    db.session.commit()
    return resource


def update_resource(resource, update_data):
    """Updates a resource in the DB with the given parameters."""
    for key in update_data:
        if key in RESOURCE_MUTABLE_PROPERTIES:
            setattr(resource, key, update_data[key])
    db.session.commit()


def get_resource_dict(resource):
    """Returns a dict representation of a Resource class object."""
    return {
        "id": resource.id,
        "name": resource.name,
        "type": resource.type,
        "status": resource.status,
        "quantity": resource.quantity,
        "unit": resource.unit,
        "account_id": resource.account.id,
        "account": resource.account.name,
        "created": resource.created_at,
        "modified": resource.modified_at,
    }
