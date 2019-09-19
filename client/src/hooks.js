import { useState, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { storage } from "./FunProvider";
import { PLAYER_QUERY } from "./components/Player";

const GITHUB_AUTHORIZATION_URL_QUERY = gql`
  query githubAuthQuery {
    githubAuthorizationUrl
  }
`;

const GITHUB_AUTHORIZATION = gql`
  mutation githubAuth($code: String!) {
    githubAuthorization(code: $code) {
      token
      player {
        login
        name
        avatar
        instrument
        playingGame
        endEvent
        team {
          color {
            name
            text
          }
          players {
            avatar
            login
          }
        }
      }
    }
  }
`;

export const useAuth = (history = { replace: f => f }) => {
  const [signingIn, setSigningIn] = useState(false);
  const client = useApolloClient();

  const { loading: loadingAuthUrl, data: url, error: queryError } = useQuery(
    GITHUB_AUTHORIZATION_URL_QUERY
  );
  const [authorizeGithubMutation, { loading, data, error }] = useMutation(
    GITHUB_AUTHORIZATION
  );

  const authorize = () => {
    setSigningIn(true);
    window.location = url.githubAuthorizationUrl;
  };

  useEffect(() => {
    if (data) {
      storage.setItem("token", data.githubAuthorization.token);
      client.writeQuery({
        query: PLAYER_QUERY,
        data: {
          me: data.githubAuthorization.player
        }
      });
      history.replace("/");
    }
  }, [data]);

  useEffect(() => {
    if (!window.location.search.match(/code=/)) return;
    setSigningIn(true);
    const code = window.location.search.replace("?code=", "");
    console.log("here: ", code);
    authorizeGithubMutation({ variables: { code } });
  }, []);

  return {
    loading: signingIn || loading || loadingAuthUrl,
    error: queryError || error,
    authorize
  };
};
