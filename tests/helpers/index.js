import client from "./createClient";
import gql from "graphql-tag";

export * from "./db";

export const subscribePlayerInstructions = async token => {
  global.token = token;

  //
  //  TODO Subscribe player
  //    - listen to subscriptions
  //    - handle callback
  //    - unsubscribe
  //
};

export const subscribeBoardGame = async () => {
  global.token = process.env.ADMIN_SECRET;

  //
  // TODO Subscribe Board
  //    - listen to subscriptions
  //    - handle callback
  //    - unsubscribe
  //
};

export const meQuery = async token => {
  global.token = token;
  const { data } = await client.query({
    query: gql`
      query me {
        me {
          login
          name
          avatar
          hometown
        }
      }
    `
  });
  return data;
};

export const putPlayerBack = async login => {
  global.token = process.env.ADMIN_SECRET;
  const { data } = await client.mutate({
    mutation: gql`
      mutation putBack($login: ID) {
        putBackPlayer(login: $login) {
          count
          player {
            login
          }
        }
      }
    `,
    variables: { login }
  });
  return data;
};

export const queryOnDeck = async () => {
  const { data } = await client.query({
    query: gql`
      query listPlayersOnDeck {
        playerCount(onDeck: true)
        allPlayers(onDeck: true) {
          login
        }
      }
    `
  });
  return data;
};

export const pickPlayer = async () => {
  global.token = process.env.ADMIN_SECRET;
  const { data } = await client.mutate({
    mutation: gql`
      mutation pickPlayer {
        pickPlayer {
          count
          player {
            login
          }
        }
      }
    `
  });
  return data;
};

export const createTestPlayers = async (count = 1) => {
  const players = [];
  for (let i = 0; i < count; i++) {
    players.push(await authorizeTestUser());
  }
  return players;
};

export const getGithubAuthUrl = async () => {
  const { data } = await client.query({
    query: gql`
      query githubUrl {
        githubAuthorizationUrl
      }
    `
  });
  return data;
};

export const queryPlayers = async () => {
  const { data } = await client.query({
    query: gql`
      query listPlayers {
        playerCount
        allPlayers {
          login
          name
          hometown
          avatar
        }
      }
    `
  });
  return data;
};

export const authorizeTestUser = async () => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation auth {
        githubAuthorization(code: "TEST_PLAYER") {
          token
          player {
            login
            name
            hometown
            avatar
          }
        }
      }
    `
  });
  return data;
};
