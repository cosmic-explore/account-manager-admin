from app import bcrypt


class Hasher:
    """Helper class to handle password hashing. Can be swapped out for a dummy class during testing"""

    def hash(self, input_text):
        return bcrypt.generate_password_hash(input_text).decode()

    def verify(self, hash, input_text):
        return bcrypt.check_password_hash(hash, input_text)
