from functools import wraps
from flask import Response
from flask_login import current_user


def admin_required(func):
    """Decorator that validates the current user has the admin role before allowing the function to execute."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        if current_user.role == "admin":
            return func(*args, **kwargs)
        else:
            return Response(status=401)

    return wrapper
