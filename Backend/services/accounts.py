from classes.base import db
from classes.account import Account


def get_all_accounts():
    return Account.get_all()


def get_account(id):
    return Account.get_by_id(id)


def get_resources(account_id):
    account = get_account(account_id)
    return account.resources


def create_account(name, status):
    account = Account(name, status)
    db.session.add(account)
    db.session.commit()
    return account


def update_account(account, update_data, mutable_props):
    for key in update_data:
        if key in mutable_props:
            setattr(account, key, update_data[key])
    db.session.commit()


def get_account_dict(account):
    return {"id": account.id, "name": account.name, "status": account.status}
