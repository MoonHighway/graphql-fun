import React from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { LoadingScreen } from "../../ui";
import gql from "graphql-tag";

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

export default function PickPlayer({
  onStartGame = f => f,
  maxPlayers = 100,
  minPlayers = 1,
  count = 0
}) {
  const [pick, { data, loading, error }] = useMutation(PICK_PLAYER);
  if (loading) return <LoadingScreen />;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  const playerCount = data ? data.pickPlayer.count : count;
  const morePlayers = maxPlayers - playerCount;
  return (
    <Container>
      <div>
        {data && (
          <>
            <img
              src={data.pickPlayer.player.avatar}
              alt=""
              width={100}
              height={100}
            />
            <h1>
              {data.pickPlayer.player.name || data.pickPlayer.player.login}
            </h1>
          </>
        )}
        {playerCount >= minPlayers && playerCount <= maxPlayers && (
          <button onClick={() => onStartGame()}>START GAME!</button>
        )}
        {playerCount < maxPlayers && (
          <button onClick={pick}>
            Pick {morePlayers} more Player{morePlayers > 1 && "s"}
          </button>
        )}
      </div>
    </Container>
  );
}

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
