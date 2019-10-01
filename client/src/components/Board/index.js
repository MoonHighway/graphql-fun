import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Connections } from "./Connections";
import { AudiencePoll } from "./Callouts";
import { LoadingScreen } from "../ui";

export const QUERY_BOARD_STATE = gql`
  query boardState {
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
    TODO: ADD LISTENER
`;

export default function Board() {
  const { loading, data } = useQuery(QUERY_BOARD_STATE);

  if (loading) return <LoadingScreen />;
  if (!data || !data.callout) return <Connections />;

  return <AudiencePoll results={data.callout.results} />;
}
