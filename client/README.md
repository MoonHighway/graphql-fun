# GraphQL Fun Demo Client

This is the client React app for graphql.fun.

## Installation

From the `./client` directory:

### 1. Start a local instance of the API.

Follow [the instructions](../api) to start the API in a separate terminal.

### 1. Run `npm i` to install the dependencies

### 2. Add a `.env` file the the `./client` directory

You need to tell the client where to fo find the GraphQL API. This is done with environment variables. Assuming you have the api running on port 4000, your `.env` file should look like:

```
SKIP_PREFLIGHT_CHECK=true
REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
REACT_APP_TEST_PLAYERS=false
REACT_APP_GRAPHQL_SUBSCRIPTIONS=ws://localhost:4000/graphql
```

### 3. Run `npm start` from the `./api` directory to start the development server

Then browse [localhost:3000](http://localhost:3000) to see the player screen. Note, the client dev server is running on port `3000` and the built productionversion will be runnion on `4000`. Make sure you are browsing port `3000` when you are working.

## Starting a Game

In order to run a game you must add the admin secret to `localStorage`. The secret must match the API secret that you setup when you run the api. You can set this secret in the browser by opening the console and running: `localStorage.setItem('token','<Your admin secret>)`. If you setup test players with the environment variable: `REACT_APP_TEST_PLAYERS=true`, then you would add the secret to session storage: `sessionStorage.setItem('token", '<Your admin secret>)`.

1. Browse [localhost:3000/board](http://localhost:3000/board) to see the connection and game screen.
2. Once everyone has connected switch to [localhost:3000/pick](http://localhost:3000/pick) to randomly pick players. (must have admin setup to run a pick mutation)
3. Once all the players are picked press "Start Game" to start wejay
