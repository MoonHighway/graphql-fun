import React, { useEffect } from "react";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Connections } from "./Connections";
import { AudiencePoll } from "./Callouts";
import { PerfIsRight } from "./Games";
import { LoadingScreen } from "../ui";

export const QUERY_BOARD_STATE = gql`
  query boardState {
    game {
      name
      state
      maxPlayers
      minPlayers
    }
    callout {
      name
      state
      ... on AudiencePoll {
        results {
          question
          yesLabel
          noLabel
          yes
          no
        }
      }
    }
  }
`;

export const LISTEN_BOARD_STATE = gql`
  subscription boardStatus {
    callout {
      name
      state
      ... on AudiencePoll {
        results {
          question
          yesLabel
          noLabel
          yes
          no
        }
      }
    }
  }
`;

export const LISTEN_GAME_STATE = gql`
  subscription gameState {
    game {
      name
      state
      maxPlayers
      minPlayers
    }
  }
`;

export default function Board() {
  const { loading, data, error } = useQuery(QUERY_BOARD_STATE);
  const { data: boardStatus } = useSubscription(LISTEN_BOARD_STATE);
  const { data: gameState } = useSubscription(LISTEN_GAME_STATE);

  if (loading) return <LoadingScreen />;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (boardStatus && boardStatus.callout)
    return <AudiencePoll results={boardStatus.callout.results} />;
  if (gameState && gameState.game) return <PerfIsRight game={gameState.game} />;
  if (data && data.callout)
    return <AudiencePoll results={data.callout.results} />;
  if (data && data.game) return <PerfIsRight game={data.game} />;

  return <Connections />;
}
