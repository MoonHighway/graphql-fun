import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { LoadingScreen } from "../ui";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const PICK_PLAYER = gql`
  mutation pick {
    pickPlayer {
      count
      player {
        login
        avatar
        name
      }
    }
  }
`;

const START_GAME = gql`
  mutation start {
    startGame {
      playerCount
    }
  }
`;

function _PickPlayer({ history }) {
  const [pick, { data, loading, error }] = useMutation(PICK_PLAYER);
  const [
    startGame,
    { data: startData, loading: starting, error: startError }
  ] = useMutation(START_GAME);

  useEffect(() => {
    if (!startData) return;
    console.log("Game Started");
    history.replace("/board");
  }, [startData, history]);

  if (loading || starting) return <LoadingScreen />;
  if (error || startError)
    return <pre>{JSON.stringify(error ? error : startError, null, 2)}</pre>;
  if (!data)
    return (
      <Container>
        <div>
          <button onClick={pick}>Pick Player</button>
        </div>
      </Container>
    );

  if (data.pickPlayer.count === 5)
    return (
      <Container>
        <div>
          <img
            src={data.pickPlayer.player.avatar}
            alt=""
            width={100}
            height={100}
          />
          <h1>{data.pickPlayer.player.name || data.pickPlayer.player.login}</h1>
          <button onClick={startGame}>START GAME!</button>
        </div>
      </Container>
    );

  return (
    <Container>
      <div>
        <img
          src={data.pickPlayer.player.avatar}
          alt=""
          width={100}
          height={100}
        />
        <h1>{data.pickPlayer.player.name || data.pickPlayer.player.login}</h1>
        <button onClick={pick}>Pick {5 - data.pickPlayer.count} more</button>
      </div>
    </Container>
  );
}

export const PickPlayer = withRouter(_PickPlayer);

const Container = styled.div`
  align-self: stretch;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 400px;
    height: 400px;
    border-radius: 50%;
  }

  h1 {
    text-align: center;
    margin: 0.5em;
    font-size: 4em;
    color: white;
    font-family: ${props => props.theme.fonts.fun};
  }

  div {
    text-align: center;
  }

  button {
    border: solid 1px white;
    background-color: transparent;
    color: white;
    font-family: ${props => props.theme.fonts.creativeLight};
    font-size: 3em;
    padding: 0.5em 1em;

    &:hover {
      background-color: ${props => props.theme.colors.contrast};
      color: ${props => props.theme.colors.dark};
    }
  }
`;
