import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Connections } from "./Connections";
import Wejay from "./Games/Wejay";
import { LoadingScreen } from "../ui";

export const CURRENT_GAME = gql`
  query game {
    currentGame {
      playerCount
      playingMusic {
        instrument
      }
      players {
        login
        name
        avatar
        instrument
      }
    }
  }
`;

export default function Board() {
  const { loading, data } = useQuery(CURRENT_GAME);

  if (loading) return <LoadingScreen />;
  if (!(data && data.currentGame.playerCount)) return <Connections />;

  return (
    <Wejay
      players={data.currentGame.players}
      playingMusic={data.currentGame.playingMusic}
    />
  );
}
