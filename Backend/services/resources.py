from classes.base import db
from classes.resource import Resource

RESOURCE_MUTABLE_PROPERTIES = ["name", "type", "status", "quantity"]


def get_all_resources():
    return Resource.get_all()


def get_resource(id):
    return Resource.get_by_id(id)


def create_resource(name, type, status, quantity, account_id):
    resource = Resource(name, type, status, quantity, account_id)
    db.session.add(resource)
    db.session.commit()
    return resource


def update_resource(resource, update_data):
    for key in update_data:
        if key in RESOURCE_MUTABLE_PROPERTIES:
            setattr(resource, key, update_data[key])
    db.session.commit()


def get_resource_dict(resource):
    return {
        "id": resource.id,
        "name": resource.name,
        "type": resource.type,
        "status": resource.status,
        "quantity": resource.quantity,
        "account": resource.account.name,
        "created": resource.created_at,
        "modified": resource.modified_at,
    }
