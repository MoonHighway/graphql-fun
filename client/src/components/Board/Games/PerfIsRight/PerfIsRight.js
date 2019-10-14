import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PickPlayer from "../PickPlayer";
import gql from "graphql-tag";
import styled from "styled-components";
import tile from "./assets/tile.png";

const CHANGE_STATE = gql`
  mutation change($newState: String!) {
    changeGameState(newState: $newState) {
      name
      state
      playerCount
    }
  }
`;

const Player = ({ login, avatar, guess, duration, winner }) => {
  return (
    <PlayerDisplay
      isWinner={winner && winner.player && winner.player.login === login}
    >
      <img src={avatar} alt="" />
      <h1>{login}</h1>
      <PerfDisplay>{guess}ms</PerfDisplay>
      <p>{winner && duration + "ms"}</p>
    </PlayerDisplay>
  );
};

export function PerfIsRight({
  game: {
    state,
    maxPlayers = 100,
    minPlayers = 1,
    playerCount = 0,
    players = [],
    winner
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
        players={players}
        count={playerCount}
      />
    );

  return (
    <Container>
      <div>
        {!winner && (
          <h1>
            How long will it a mutation to push subscription data back to your
            device in ms? {winner && winner.answer}
          </h1>
        )}
        {winner && <h1>The average is {winner.answer}ms</h1>}
      </div>
      <div>
        {players.map(p => (
          <Player key={p.login} {...p} winner={winner} />
        ))}
      </div>
    </Container>
  );
}

const PlayerDisplay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  img {
    border-radius: 50%;
  }
  p {
    font-size: 4em;
    color: ${props => (props.isWinner ? props.theme.colors.contrast : "red")};
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
  align-self: stretch;
  width: 100%;
  height: 100%;
  display: flex;
  background-image: url(${tile});
  background-size: 100px;
  color: white;
  flex-direction: column;
  > div {
    &:first-child {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        background-color: ${props => props.theme.colors.contrast};
        text-align: center;
        font-size: 3em;
        color: rgb(0, 0, 101);
        font-family: ${props => props.theme.fonts.creativeLight};
        padding: 5%;
        margin: 5%;
      }
    }
    &:last-child {
      flex-grow: 2;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 100px;
    }
  }
`;
