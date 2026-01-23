from utility.hashing import Hasher


def validate_person(person, pass_text):
    password_hasher = Hasher()
    return password_hasher.verify(person.passhash, pass_text)
