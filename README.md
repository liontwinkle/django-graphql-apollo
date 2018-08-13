# Interview Frontend

Welcome!

## Tasks

Use React (v16+), Apollo (v2+), and React Router (v4+) to implement the following:

1. Post list page
2. Post detail page
3. Add/edit/delete post
4. Author detail page (with author posts)

**You don't have to finish all of these.** We would like to see at least one query and one mutation. We would prefer you focus on quality rather than quantity.

Feel free to use any additional libraries.

### API

You can use the graphql playground (similar to GraphiQL) to explore the available queries and mutations. To reset the mock data send a `reset` mutation.

http://localhost:5000/graphql

Note: There seems to be a temporary issue with the cursor not showing up in GraphQL playground. See this comment for a workaround: https://github.com/prismagraphql/graphql-playground/issues/790#issuecomment-408675087

Create React App is set up to proxy from port 3000 to port 5000, so you can use a relative URL for the graphql endpoint.

### Design

You won't be judged on design, but feel free to wow us!

## Requirements

- Node 8+

## Getting Started

    npm install

Then:

    npm start

Your browser will automatically open to http://localhost:3000 by Create React App. Changes should be reflected automatically.

See [docs/create-react-app.md](./docs/create-react-app.md) for CRA documentation.
