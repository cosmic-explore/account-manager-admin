"""Contains a method to run the flask app. This file is intended for development purposes and not used in production"""

import os

from app.factory import create_app

app = create_app()

if __name__ == "__main__":
    # for running the app without guinicorn in development
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
