from classes.base import db
from classes.account import Account


def get_all_accounts():
    """Returns a list of all accounts in the DB."""
    return Account.get_all()


def get_account(id):
    """Returns the account with given id from the DB, or None if it doesn't exist."""
    return Account.get_by_id(id)


def get_resources(account_id):
    """Returns a list of all resources in the DB associated with the given account id."""
    account = get_account(account_id)
    return account.resources


def create_account(name, status):
    """Creates an Account in the DB with the given parameters."""
    account = Account(name, status)
    db.session.add(account)
    db.session.commit()
    return account


def update_account(account, update_data, mutable_props):
    """Updates the given Account with the given parameters."""
    for key in update_data:
        if key in mutable_props:
            setattr(account, key, update_data[key])
    db.session.commit()


def get_account_dict(account):
    """Returns a dict representation of the given Account class object."""
    return {"id": account.id, "name": account.name, "status": account.status}
