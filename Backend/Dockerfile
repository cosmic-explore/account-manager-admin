FROM python:3.13-slim

# set a directory for the app
WORKDIR /usr/src/app

# copy all files to the container
COPY . .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the Flask app will run on
EXPOSE 5000

RUN chmod +x start.sh

CMD ["./start.sh"]