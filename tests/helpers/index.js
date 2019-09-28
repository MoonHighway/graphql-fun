import client from "./createClient";
import gql from "graphql-tag";

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
          }
        }
      }
    `
  });
  return data;
};
