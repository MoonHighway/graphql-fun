import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LoadingScreen, WelcomeScreen } from "../ui";
import AuthorizedPlayer from "./AuthorizedPlayer";
import CurrentPlayer from "./CurrentPlayer";
import gql from "graphql-tag";

export const PLAYER_FIELDS = gql`
  fragment PlayerFields on Player {
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
`;

export const PLAYER_QUERY = gql`
  query playerQuery {
    me {
      ...PlayerFields
    }
  }
  ${PLAYER_FIELDS}
`;

export default function Player() {
  const { loading, data, error } = useQuery(PLAYER_QUERY);

  if (loading) return <LoadingScreen />;
  else if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  else if (!data || !data.me)
    return (
      <WelcomeScreen>
        <AuthorizedPlayer />
      </WelcomeScreen>
    );

  return <CurrentPlayer {...data.me} />;
}
