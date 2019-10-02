import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { LoadingScreen, WelcomeScreen } from "../ui";
import AuthorizedPlayer from "./AuthorizedPlayer";
import CurrentPlayer from "./CurrentPlayer";
import { Vote } from "./Callouts";
import gql from "graphql-tag";

export const PLAYER_FIELDS = `
  fragment PlayerFields on Player {
    login
    name
    hometown
    avatar
    instructions {
      game {
        name 
        state 
        maxPlayers 
        minPlayers 
      }
      callout {
        name
        state
        ...on AudiencePoll {
          results {
            question
            yesLabel
            noLabel
          }
        }
      }
    }
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

export const LISTEN_FOR_INSTRUCTIONS = gql`
  subscription listen {
    me {
      ...PlayerFields
    }
  }
  ${PLAYER_FIELDS}
`;

export default function Player() {
  const { loading, data, error } = useQuery(PLAYER_QUERY);
  const { data: playerStatus } = useSubscription(LISTEN_FOR_INSTRUCTIONS);

  console.log("Player Status");
  console.log(playerStatus);

  if (loading) return <LoadingScreen />;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (playerStatus && playerStatus.me.instructions.callout)
    return <Vote poll={playerStatus.me.instructions.callout.results} />;
  if (data && data.me && data.me.instructions.callout && !playerStatus)
    return <Vote poll={data.me.instructions.callout.results} />;
  if (data && data.me) return <CurrentPlayer {...data.me} />;

  return (
    <WelcomeScreen>
      <AuthorizedPlayer />
    </WelcomeScreen>
  );
}
