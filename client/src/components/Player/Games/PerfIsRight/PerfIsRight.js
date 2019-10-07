import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import styled from "styled-components";
import gql from "graphql-tag";

const GUESS = gql`
  mutation guess($perf: Int!) {
    guess(perf: $perf)
  }
`;

const SEND_MEASURE = gql`
  mutation sendMeasure($duration: Int!) {
    sendMeasure(duration: $duration)
  }
`;

const PERF_SUBSCRIPTION = gql`
  subscription {
    performance
  }
`;

const PlayControls = ({ login, name, guess }) => {
  const [complete, setComplete] = useState(false);
  const [yourGuess, setYourGuess] = useState(guess);
  const [perf, setVal] = useState(1000);
  const [makeGuess] = useMutation(GUESS);
  const [sendMeasure] = useMutation(SEND_MEASURE);
  const { data } = useSubscription(PERF_SUBSCRIPTION);

  useEffect(() => {
    if (!data) return;
    if (complete) return;
    if (data.performance !== login) return;
    performance.mark("response");
    try {
      performance.measure("mutationTime", "send", "response");
      let [{ duration }] = performance.getEntriesByName("mutationTime");
      duration = Math.round(duration);
      sendMeasure({ variables: { duration } });
      console.log("measure sent");
      setComplete(true);
    } catch (e) {}
  }, [data]);

  if (yourGuess)
    return (
      <h1 style={{ color: "white" }}>
        Your guess: {yourGuess}ms {complete && "✅"}
      </h1>
    );

  return (
    <Controls>
      <h1>{login || name} what do you think?</h1>
      <input
        type="number"
        name="guess"
        value={perf}
        onChange={e => setVal(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          performance.mark("send");
          makeGuess({ variables: { perf } });
          console.log("perf sent: ", perf);
          setYourGuess(perf);
        }}
      >
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
