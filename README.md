# Uplift Interview

Welcome!

## Intro

This repository contains the Uplift coding "challenge", if you can call it that.
We believe in letting you work as freely as you want within the constraints of
this setup. Our goals are to assess:

- that you can follow specs/requirement docs, making pragmatic decisions along the way
- your level of expertise (mid-level=good approach, expert level=teach us something we don't know)

## Table of Contents

1. [Challenge criteria](#challenge-criteria)
1. [General instructions](#general-instructions)
1. [Frontend challenge](#frontend-challenge)
1. [Backend challenge](#backend-challenge)

## Challenge criteria

- overall architecture and code quality (readability, decoupledness, etc)
- file structure
- naming
- test coverage (see instructions for [running tests](#running-tests))
- proficiency

If you wish to work full-stack, please attempt both of these:

- [Frontend challenge](#frontend-challenge)
- [Backend challenge](#backend-challenge)

## General instructions

- Please note there is a shared `.env` file for environment variables. This file is used by
  frontend and backend. The `./docker-assist` script automatically copies the example for you.
- Please lint and explain your code (even just briefly). For python, order imports (see backend section).
- After completing the challenge to a level that you're satisfied shows off your expertise,
  open a pull request against master (can open two separate ones if you're doing frontend + backend)
- In your PR add a description explaining anything you think is worthwhile, and/or just summarizing
  your approach.
- The repo uses CircleCI to run tests and lint checks on your PR. We'd like to see those passing.

## Frontend challenge

Use React (v16+), Apollo (v2+), and React Router (v4+) to implement the following:

1. Post list page
2. Post detail page
3. Add/edit/delete post
4. Author detail page (with author posts)
5. Something interesting that shows off your expertise.
   - Examples: post drafts/publishing, versioning, auth, multiple authors, etc.
   - Can also be a piece of code you already wrote, unrelated to this project.
   - Showcase something cool visually (animated gif, video), or in code and explain
    why it is cool so that it's super easy to understand.

Please write tests.

Feel free to use any additional libraries.

The frontend automatically runs with the mock server API.

To run the frontend with the Django backend, run `npm run start:js`

### Mock Server API

This is located in mock-node-server.

You can use the graphql playground (similar to GraphiQL) to explore the available queries and mutations. To reset the mock data send a `reset` mutation.

http://localhost:5000/graphql

Note: There seems to be a temporary issue with the cursor not showing up in GraphQL playground. See this comment for a workaround: https://github.com/prismagraphql/graphql-playground/issues/790#issuecomment-408675087

Create React App is set up to proxy from port 3000 to port 5000, so you can use a relative URL for the graphql endpoint.

### Design

You won't be judged on design, but feel free to wow us!

### Requirements

- Node 8+

### Getting Started

    npm install

Then:

    npm start

Your browser will automatically open to http://localhost:3000 by Create React App. Changes should be reflected automatically.

See [CRA documentation](https://facebook.github.io/create-react-app/).

## Backend challenge

Use Django (v2+), graphene (v2+), and a SQL database (postgres, for migrations) to implement the following, a blog:

1. Post model and API to list posts
2. API to get a specific post
3. API to add/edit/delete post
4. Keep an up-to-date count of the posts created by an author
5. Author detail page (with author posts)
6. Something interesting that shows off your expertise.
   - Examples: post drafts/publishing, versioning, auth, multiple authors,
     use any advanced python or Django features to make an addition of your own, etc.
   - Can also be a piece of code you already wrote, unrelated to this project.
   - Showcase something cool visually (animated gif, video), or in code and explain
     why it is cool so that it's super easy to understand.

You can implement your own database architecture (models) and your own GraphQL schema. You do not have to copy the playground schema (mentioned below), although you can use it for inspiration.

You also don't need to implement authentication (although you are welcome to, if you prefer). You can fake it at the middleware level, or log in to the Django admin and send subsequent requests with the session information set by Django.

Feel free to use any additional libraries.

You can run a sample query at http://localhost:5000/graphql/:

```graphql
query {
  me {
    username
    email
  }
}
```

### Getting started

On MacOS, use [brew](https://brew.sh/) to manage installation of supporting programs, as it keeps things tidy on OSX.

Main dependency is Docker and Compose.

- Install [Docker](https://docs.docker.com/docker-for-mac/install/)
- Install [Compose](https://docs.docker.com/compose/install/)

After you've got those:

```bash
./docker-assist start  # if this fails, try ./d build first
```

Wait a while and you're ready to go. It's a good idea to run `start` as-is (attached mode).
However, if you don't care about the server logs for now, you can start in daemon mode.

To start in daemon mode:

```bash
cd server/
./docker-assist start -d
```

Now you can go to http://localhost:5000, http://localhost:5000/graphql/, or http://localhost:5000/admin/ for the Django admin.

Log in to the admin with the [sample test user](#sample-test-user) from below and try the sample query from the challenge.

Feel free to inspect the `docker-assist` bash script to see other handy commands you can run.

### Installing packages

This project uses [Pipenv](https://pipenv.readthedocs.io/en/latest/). If you wish to add dependencies, `./docker-assist bash` into the container and then:

```
pipenv install <package name>  # this automatically adds it to the Pipfile and Pipfile.lock
pipenv install --system --deploy --ignore-pipfile --dev  # install globally to avoid need to rebuild
```

### Running tests

Please run the tests, and lint your backend code. This helps us review code, as it's already consistent with this project.

```bash
./docker-assist lint
./docker-assist test
```

The following are set up by docker containers. No need to install them yourself, this is just an overview:

### Server architecture

- PostgreSQL 10+
- Python 3.6+
- Django 2
- [django-environ](https://github.com/joke2k/django-environ) for easy environment configuration via `.env` files

### Sample test user

The database is created with a sample test user:

| Name     | Value                   |
| -------- | ----------------------- |
| Username | interview               |
| Email    | interview@uplift.agency |
| Password | uplifty                 |

You can change these in the Django admin if you wish.
