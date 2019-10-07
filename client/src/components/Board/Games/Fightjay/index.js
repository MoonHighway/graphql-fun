import React, { useEffect } from "react";
import { useMusic } from "../../../../hooks";
import styled from "styled-components";
import s1 from "./assets/s1.mp3";
import s2 from "./assets/s3.mp3";
import s3 from "./assets/s4.mp3";
import s4 from "./assets/s5.mp3";
import { LoadingScreen } from "../../../ui";

const trackMap = {
  GRAPHQL: "BASS",
  NODE: "DRUMS",
  REACT: "PERCUSSION",
  TYPESCRIPT: "SAMPLER"
};

export function Fightjay({ game: { results } }) {
  const { loading, playTrack } = useMusic([s1, s2, s3, s4]);

  useEffect(() => {
    if (loading) return;
    playTrack(trackMap[results.leader]);
  }, [loading, results.leader]);

  if (loading) return <LoadingScreen />;
  return (
    <Container>
      <h1>{results.leader}</h1>
      <p>{results[results.leader.toLowerCase()]} votes</p>
    </Container>
  );
}

const Container = styled.section`
  color: white;
  font-size: 2em;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
