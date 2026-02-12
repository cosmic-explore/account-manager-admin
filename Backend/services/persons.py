from classes.base import db
from classes.person import Person
from utility.hashing import Hasher


def validate_person(person, pass_text):
    password_hasher = Hasher()
    return password_hasher.verify(person.passhash, pass_text)


def get_all_persons():
    return Person.get_all()


def create_person(email, role, password):
    password_hasher = Hasher()
    person = Person(email, role, password, password_hasher)
    db.session.add(person)
    db.session.commit()


def get_person_dict(person):
    return {"id": person.id, "email": person.email, "role": person.role}
