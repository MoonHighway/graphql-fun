import React, { useEffect } from "react";
import {
  useMutation,
  useSubscription,
  useApolloClient
} from "@apollo/react-hooks";
import gql from "graphql-tag";
import { storage } from "../../FunProvider";
import { PLAYER_FIELDS, PLAYER_QUERY } from ".";
import { WaitingForInstructions } from "../ui/WaitingForInstructions";
// import { End } from './ui/End'
// import { Team } from './Team'
// import { Game } from './Game'

const Game = ({ instrument }) => <h1>Game: {instrument}</h1>;
const Team = () => <h1>Team</h1>;
const End = () => <h1>End</h1>;

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

const LISTEN_FOR_INSTRUCTIONS = gql`
  subscription instructions {
    instructions {
      ...PlayerFields
    }
    ${PLAYER_FIELDS}
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
  const { data } = useSubscription(LISTEN_FOR_INSTRUCTIONS);

  useEffect(() => {
    if (!data) return;

    console.log("data changed");
    console.log(data);
    console.log("new instructions: ", data.instructions.endEvent);

    client.writeData({
      data: {
        me: data.instructions
      }
    });
  }, [data, client]);

  const logout = async () => {
    logoutMutation();
    storage.removeItem("token");
    client.writeQuery({
      query: PLAYER_QUERY,
      data: {
        me: null
      }
    });
  };

  if (playingGame) return <Game instrument={instrument} />;
  if (team) return <Team {...team} avatar={avatar} onLeave={this.logOut} />;
  if (endEvent) return <End />;

  return (
    <WaitingForInstructions
      name={name || login}
      avatar={avatar}
      onLeave={logout}
    />
  );
}
