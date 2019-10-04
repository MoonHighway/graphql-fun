import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PickPlayer from "../PickPlayer";
import gql from "graphql-tag";
import styled from "styled-components";

const CHANGE_STATE = gql`
  mutation change($newState: String!) {
    changeGameState(newState: $newState) {
      name
      state
      playerCount
    }
  }
`;

const Player = ({ login, name, avatar }) => (
  <PlayerDisplay>
    <img src={avatar} alt="" />
    <h1>{login}</h1>
    <PerfDisplay>0</PerfDisplay>
  </PlayerDisplay>
);

export function PerfIsRight({
  game: {
    state,
    name,
    maxPlayers = 100,
    minPlayers = 1,
    playerCount = 0,
    players = []
  }
}) {
  const [changeState] = useMutation(CHANGE_STATE);
  const startGame = () => changeState({ variables: { newState: "playing" } });

  if (state === "picking players")
    return (
      <PickPlayer
        maxPlayers={maxPlayers}
        minPlayers={minPlayers}
        onStartGame={startGame}
        count={playerCount}
      />
    );

  return (
    <Container>
      <div>
        <h1>Question</h1>
      </div>
      <div>
        {players.map(p => (
          <Player key={p.login} {...p} />
        ))}
      </div>
    </Container>
  );
}

const PlayerDisplay = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: flex-end;
  backgound-color: blue;
  align-items: center;
  img {
    border-radius: 50%;
  }
`;

const PerfDisplay = styled.div`
  color: white;
  font-family: verdana;
  font-weight: bold;
  font-size: 2em;
  height: 100%;
  width: 100%;
  text-align: right;
  border: solid 4px white;
  padding: 0.25em;
`;

const Container = styled.section`
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    &:first-child {
      flex-grow: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:last-child {
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
`;
