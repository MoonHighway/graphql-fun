import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { LoadingScreen } from "../ui";
import background from "./assets/background.png";
import styled from "styled-components";

export const ALL_PLAYERS = gql`
  query allPlayers {
    playerCount
  }
`;

export const LISTEN_FOR_CONNECTIONS = gql`
  subscription {
    connection {
      playerCount
      status
    }
  }
`;

export const Connections = () => {
  const [anim, trigger] = useState(true);
  const { loading, data: queryData, error } = useQuery(ALL_PLAYERS);
  const { data: connectionData, error: connectionError } = useSubscription(
    LISTEN_FOR_CONNECTIONS
  );

  if (loading) return <LoadingScreen />;
  if (error || connectionError)
    return <pre>{JSON.stringify(error || connectionError, null, 2)}</pre>;

  const playerCount = connectionData
    ? connectionData.connection.playerCount
    : queryData.playerCount;

  return (
    <Container>
      <Count>
        {playerCount} players!
        <AnimatedBackground count={playerCount} />
      </Count>
    </Container>
  );
};

const AnimatedBackground = ({ count, duration = 1000 }) => {
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    setAnim(true);
  }, [count]);

  useEffect(() => {
    setTimeout(() => setAnim(false), 1000);
  });
  return <Copy animation={anim}>{count}</Copy>;
};

const Copy = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  animation: ${props => (props.animation ? "smoke 1s ease-out" : "none")};
  @keyframes smoke {
    0% {
      opacity: 1;
      top: 0px;
    }
    100% {
      opacity: 0;
      top: -175px;
      left: -20px;
      font-size: 2em;
    }
  }
`;

const Count = styled.div`
  position: absolute;
  right: 0;
  width: 30%;
  bottom: 30%;
  font-size: 5em;
  color: rgb(230, 179, 63);
  text-align: left;
`;

const Container = styled.div`
  align-self: stretch;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${background});
  background-size: cover;
  background-position: right bottom;
`;
