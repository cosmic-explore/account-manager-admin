from classes.base import db
from classes.person import Person
from utility.hashing import Hasher


def validate_person(person, pass_text):
    """Uses the app's Hasher to verify the given password against the Person's stored password hash."""
    password_hasher = Hasher()
    return password_hasher.verify(person.passhash, pass_text)


def get_all_persons():
    """Returns a list of all the Person records in the DB."""
    return Person.get_all()


def create_person(email, role, password):
    """Creates a person in the DB with the given parameters."""
    password_hasher = Hasher()
    person = Person(email, role, password, password_hasher)
    db.session.add(person)
    db.session.commit()


def get_person_dict(person):
    """Returns a dict representation of a Person class object."""
    return {"id": person.id, "email": person.email, "role": person.role}
