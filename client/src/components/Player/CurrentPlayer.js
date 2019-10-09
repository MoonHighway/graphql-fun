import React from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { storage } from "../../FunProvider";
import { WaitingForInstructions } from "../ui/WaitingForInstructions";
import { End } from "../ui/End";
import { Team } from "./Team";

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export default function CurrentPlayer({ avatar, name, login, team, endEvent }) {
  const client = useApolloClient();
  const [logoutMutation] = useMutation(LOGOUT);

  const logout = async () => {
    client.writeData({
      data: {
        me: null
      }
    });
    await logoutMutation();
    storage.removeItem("token");
  };

  if (team) return <Team {...team} avatar={avatar} onLeave={logout} />;
  if (endEvent) return <End />;

  return <WaitingForInstructions name={login} onLeave={logout} />;
}
