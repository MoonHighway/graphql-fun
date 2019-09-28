import client from "./createClient";
import gql from "graphql-tag";

export * from "./db";

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
          avatar
          instrument
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
            avatar
            instrument
          }
        }
      }
    `
  });
  return data;
};
