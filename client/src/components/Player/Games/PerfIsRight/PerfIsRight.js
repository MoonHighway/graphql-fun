import React from "react";
import styled from "styled-components";

const PlayControls = props => {
  return (
    <Controls>
      <input type="number" name="guess" defaultValue={1000} />
      <button>Final Answer?</button>
    </Controls>
  );
};

export function PerfIsRight({ game, player }) {
  const gamePlayer = game.players.map(p => p.login).includes(player.login);
  if (gamePlayer) return <PlayControls />;
  return <h1>TODO: PERF LOGO</h1>;
}

const Controls = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    outline: none;
    font-size: 4em;
    font-family: verdana;
    margin: 0.25em;
    width: 250px;
    text-align: right:
  }

  button {
    font-size: 4em;
    margin-top: 2em;
  }
`;
