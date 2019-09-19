import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Connections } from "./Connections";
// import { Wejay } from './Wejay'
import { LoadingScreen } from "../ui";

export * from "./PickPlayer";

const Wejay = () => <h1>Wejay</h1>;

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

export const LISTEN_FOR_GAME_CHANGES = gql`
  subscription {
    gameChange {
      playingMusic {
        instrument
      }
      faces {
        login
        avatar
        team {
          color {
            name
          }
        }
      }
    }
  }
`;

export const PICK_PLAYER = gql`
  mutation pickPlayer {
    pickPlayer {
      count
      player {
        name
        login
        avatar
      }
    }
  }
`;

export const START_GAME = gql`
  mutation start {
    startGame {
      playerCount
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
