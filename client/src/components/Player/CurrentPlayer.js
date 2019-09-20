import React, { useEffect } from "react";
import {
  useMutation,
  useSubscription,
  useApolloClient
} from "@apollo/react-hooks";
import gql from "graphql-tag";
import { storage } from "../../FunProvider";
import { WaitingForInstructions } from "../ui/WaitingForInstructions";
// import { End } from './ui/End'
import { Team } from "./Team";
// import { Game } from './Game'

const Game = ({ instrument }) => <h1>Game: {instrument}</h1>;
const End = () => <h1>End</h1>;

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

const LISTEN_FOR_INSTRUCTIONS = gql`
  subscription instructions {
    instructions {
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
`;

export default function CurrentPlayer({
  avatar,
  name,
  login,
  team,
  playingGame,
  instrument,
  endEvent
}) {
  const client = useApolloClient();
  const [logoutMutation] = useMutation(LOGOUT);
  const { data, error } = useSubscription(LISTEN_FOR_INSTRUCTIONS);

  useEffect(() => {
    if (!data) return;
    client.writeData({
      data: {
        me: data.instructions
      }
    });
  }, [data, client]);

  const logout = async () => {
    logoutMutation();
    storage.removeItem("token");
    client.writeData({
      data: {
        me: null
      }
    });
  };

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (playingGame) return <Game instrument={instrument} />;
  if (team) return <Team {...team} avatar={avatar} onLeave={logout} />;
  if (endEvent) return <End />;

  return (
    <WaitingForInstructions
      name={name || login}
      avatar={avatar}
      onLeave={logout}
    />
  );
}
