[Live App](https://project-c9459ec0-98ee-427f-866.firebaseapp.com/)

## Introduction

Welcome! This repository is a portfolio piece designed to showcase an end-to-end implementation of a SaaS-style web application with a realistic use case: customer account metric-tracking on a platform with admin-oversight.

To that end, anyone can log into the platform with the provided credentials to explore its features. Don't worry if you see a big "Needs Attention" section when you login -- this is an intentional state that the user is meant to resolve. You can reset the app at any time by using the button on the left navigation bar.

**Credentials (Also available from login page)**

staff username: `staff1@test.com`\
staff password: `p@ssword1`

admin username: `admin@test.com`\
admin password: `p@ssword`

## Target Audience

If this was a real app rather than a showcase, its users would be the staff of a cloud-provider type company whose job it is to manage the resources available to various customer accounts and monitor for and resolve system-flagged issues. It would also be used by the system admins of the company, who have a view into the platform's activity logs and users to enforce accountability and traceability.

Because it is a showcase, the true audience are evaluators of the app's UI/UX, functionality, and underlying systems. Please feel free to engage with all the app's features and to push it to its limits. You can report issues to me using the repository's [issues tracker](https://github.com/cosmic-explore/account-manager-admin/issues), or email me at cosmicexploration82@gmail.com.

## Key Features

- Single-page web app with deep-linking
- Server-based authentication with accounts and roles
- Dashboard that tracks overall system stats, key metrics, recent user activity (if authorized as an admin), and provides actionable system-health alerts
- Interface to manage specific accounts and their resources
- Admin-accessible lists of users and user activity

The app also features a button to reset the database to its original state for the benefit of reviewers.

## Tech Stack

**Frontend**

- Typescript
- React Router with `Vite`
- Material UI

**Backend**

- Python
- `flask` web framework
- `gunicorn` web server
- `flask-login` user session management
- `flask-bcrypt` password management and authentication
- `SQLAlchemy` ORM
- `alembic` database migrations

**Database**

- PostgreSQL with the `uuid-ossp` extension

**Tests**

- `pytest`, `factory_boy`, `freezegun`

## Architecture and CI/CD

**Development**

This app was developed using `Docker` and `Docker Compose` for ease of development, reproducibility, and deployment. Both the `Backend` and `Frontend` directories contain `Dockerfile`s that can be used to build and run their contents without the overhead of managing dependencies or a separate dev environment on the developer's machine.

**Hosting**

Currently, the app is hosted using Google Cloud Platform (GCP)'s **Cloud Run** on the backend and **Firebase** for the frontend. The database is a lightweight Postgres instance hosted on **Supabase**.

Cloud Run was chosen for its simplicity in deploying Docker containers as-is, and its stateless nature plays well with `flask-login`. Meanwhile, Firebase is convenient because it supports HTTPS and is also part of the Google ecosystem. For a project of this scale, cost was also a consideration; you don't want to pay for what you don't use, and GCP is lenient enough in that regard that overall hosting costs come out to ~$0.01 per week.

**CI/CD**

This project uses **Github Actions** for its Continuous Integration and Deployment. Whenever the code is merged to the repository's `main` branch, the Flask tests run, and when they pass the app automatically deploys the new version to both Cloud Run and Firebase. This is managed by GCP's Workload Identity Federation keyless authentication system, which, though requiring more configuration than traditional secret key methods, is far more secure and extensible once set up.

## Usage and Screenshots

**Staff workflow**

1. Login with staff credentials
<img width="915" height="704" alt="image" src="https://github.com/user-attachments/assets/3e34ce51-f635-4212-9e8e-fac686ab837d" />

2. Explore the Dashboard
<img width="897" height="881" alt="image" src="https://github.com/user-attachments/assets/8786b058-4acb-4373-b114-18721eeb0306" />

3. Investigate Dashboard alerts
<img width="1067" height="363" alt="image" src="https://github.com/user-attachments/assets/3e4b455f-545f-4bc5-a0f1-0c4466edae34" />

4. Update account Resources
<img width="1175" height="735" alt="image" src="https://github.com/user-attachments/assets/44029826-ce92-4e3b-964a-1ca84d476585" />

5. Verify alerts are resolved
<img width="1071" height="258" alt="image" src="https://github.com/user-attachments/assets/23a85859-14d7-4ad4-beb5-c45ca85ac16f" />


**Admin Workflow**

1. Login with admin credentials
<img width="569" height="100" alt="image" src="https://github.com/user-attachments/assets/12535d2f-9eef-4a30-8115-a5eff61b99f4" />

2. Explore the Dashboard, including recent activity
<img width="1102" height="660" alt="image" src="https://github.com/user-attachments/assets/d6a6f43a-9508-452a-ab16-d7e51a589fda" />

3. Check the platform users
<img width="1179" height="445" alt="image" src="https://github.com/user-attachments/assets/ef84fe2c-2128-40d1-bde0-d6aa195e710d" />

4. Check the full activity log
<img width="1184" height="808" alt="image" src="https://github.com/user-attachments/assets/32eaa707-6d9e-473d-8ffc-cbf5801812ee" />

**Reset the app if needed**

1. Login as either role

2. Press the reset button in the navbar
<img width="249" height="556" alt="image" src="https://github.com/user-attachments/assets/04e07a9c-8dad-451d-a78a-a82cc2454902" />

## Local Setup

**Prerequisites**

You must have the following installed:

1. Docker
2. Docker Compose

**Installation and running**

1. Clone the repo: `git clone https://github.com/cosmic-explore/account-manager-admin.git`
2. Create environment files and set environment variables (see next section)
3. Build and start the docker containers: `docker compose up --build`
4. Seed the database:
    1. Access the backend docker container: `docker compose exec -it backend bash`
    2. Run the seeding script: `python reset_db.py`
5. Access the app at `http://localhost:5173`

**Environment Variables**

The `compose.yaml` expects a file called `.env` at the root of the project to provide the configuration needed for the docker containers. You must create that file yourself because it is not tracked by git. The contents should be as follows (feel free to customize as needed):

```
FLASK_ENV=development
FLASK_SECRET_KEY=dev_secret_key
FLASK_PORT=8080
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password
POSTGRES_DB=dev_db
POSTGRES_HOST=database
POSTGRES_PORT=5432
ALEMBIC_POSTGRES_PORT=5432
DATABASE_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
CORS_ORIGIN=http://localhost:5173
VITE_API_ROOT=http://127.0.0.1:8080
```

**Testing**

You must either access the backend container (`docker compose exec -it backend bash`) or install `pytest` locally.

Then: `cd Backend && pytest`

**Project Structure**

The structure of the project is designed to be as straightforward as possible:

```
/Backend # Flask server
/Frontend # React + Vite
/Database # The data lives here
compose.yaml # Where docker is configured
.env # The file you need to add
```

## Development Tradeoffs

During the planning and development stages, several strategic decisions were made regarding the implementation and design of the app. Such choices do not always have an objectively correct answer, so it can be helpful to provide the reasoning behind them.

**Flask**

Flask was chosen because the app has low I/O and concurrency load. If it were to need real-time log streaming, for example, Node.js could be a consideration instead, but even in that case Flask could still do the job. Meanwhile, strong and straightforward database coupling via SQLAlchemy makes Flask a good choice.

**Client Side Rendering**

CSR was chosen over SSR (Server-side rendering) because the project emulates an internal-facing type app, making SEO, and therefore SSR, extraneous. Therefore I decided to structure the frontend with the lightweight React Router library instead of something like Next.js, which also has the added benefit of a clean separation between frontend and backend responsibilities.

**After-Request Hooks**

One of the project's features is logging user activity, which there are several methods to accomplish in a Flask/Postgres environment. Which you chose, or which combination, depends on the aspect of that activity on which you want to focus. For this project, I wanted as lightweight a solution as possible, so I focused on the most important part in this type of app: user-intent. That is, even if a user's attempt to update a resource in the app fails, it is still captured regardless of whether the database is actually updated or not. This provides a comprehensive focus on accountability by storing every action that a user takes. Therefore, I implemented Flask's after-request hooks to log every API request, capturing user intent regardless of success or failure, rather than something like SQLAlchemy events that only runs after successful database mutations.

**Caching request data on frontend vs reloads**

One of the key questions for a web app is which data is cached by the client, and how. For example, in this app one can access the _Account Detail_ page from the _Account_ page, which has already loaded all the info about an account except for its resources. It would be possible to cache that already-loaded data and pass it to the Account Detail page, thereby saving an extra API call, by utilizing React Router's built in functionality, or an additional library like Tanstack Query. However, the app supports deep linking, meaning that you can access an Account Detail page from anywhere without necessarily having already accessed the Account page to cache the account's data.
Sometimes, the most straightforward option is also the most ideal. In this case, the data pulled by the Account Detail page is so lightweight that the user never has to wait long for all of the data to fetch, even though in some cases that data could be considered redundant. Fetching the full set of data each time the page is loaded also has some advantages: it guarantees the data is fresh and reduces edge cases. However, if the data was not so lightweight and page load times were key, I would consider using something like Tanstack to make the page as quick and reactive as possible.

## Future Improvements

If this app were to be fleshed out further, I would focus on these areas next:

**UX**

- Loading skeletons
- Highlighting rows on hover
- Displaying the email of the user

**System / Backend**

- `pytest` improvements: parametrized tests and factory traits
- Implement SQLAlchemy events to work in tandem with after request hooks to log user activity more comprehensively

**Database**

- Adding an `on_update` trigger to every table that would set the `modified_at` row at the database level instead of at the ORM
