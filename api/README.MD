# GraphQL Fun Demo API

This is the GraphQL API for graphql.fun.

## Installation

From the `./api` directory:

### 1. Run `npm i` to install the dependencies

### 2. Add a `.env` file the the `./api` directory

```
PORT=4000
NODE_ENV=development
GITHUB_CLIENT_ID=<Your Github Oauth Client ID>
GITHUB_CLIENT_SECRET=<Your Github Oauth Client Secret>
ADMIN_SECRET=<Secret Phrase to run admin mutation>
WEJAY_MAX_FACES=<How many faces are allowed at one time in Wejay>
```

### 3. Run `npm start` from the `./api` directory to start the development server

Then browse [localhost:4000/playground](http://localhost:4000/playground) to view the playground.
