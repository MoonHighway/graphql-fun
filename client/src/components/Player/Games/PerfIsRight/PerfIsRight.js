import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import gql from "graphql-tag";

const GUESS = gql`
  mutation guess($perf: Int!) {
    guess(perf: $perf)
  }
`;

const PlayControls = ({ login, name, guess }) => {
  const [perf, setVal] = useState(1000);
  const [makeGuess] = useMutation(GUESS);

  if (guess) return <h1 style={{ color: "white" }}>Your guess: {guess}ms</h1>;

  return (
    <Controls>
      <h1>{login || name} what do you think?</h1>
      <input
        type="number"
        name="guess"
        value={perf}
        onChange={e => setVal(parseInt(e.target.value))}
      />
      <button onClick={() => makeGuess({ variables: { perf } })}>
        Final Answer?
      </button>
    </Controls>
  );
};

export function PerfIsRight({ game, player }) {
  const gamePlayer = game.players.find(p => p.login === player.login);
  if (!gamePlayer) return <h1>TODO: PERF LOGO</h1>;
  return <PlayControls {...gamePlayer} />;
}

const Controls = styled.section`
  color: white;
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
