import React, { useEffect } from "react";
import { useMusic } from "../../../hooks";
import styled from "styled-components";
import s1 from "./assets/s1.mp3";
import s2 from "./assets/s2.mp3";
import s3 from "./assets/s3.mp3";
import s4 from "./assets/s4.mp3";
import s5 from "./assets/s5.mp3";
import { LoadingScreen } from "../../ui";

export default function Samples() {
  const { loading, playTrack, playing } = useMusic([s1, s2, s3, s4, s5]);

  useEffect(() => {
    if (loading) return;
    playTrack("BASS");
  }, [loading]);

  if (loading) return <LoadingScreen />;

  return (
    <Container>
      <Button selected={playing === "BASS"} onClick={() => playTrack("BASS")} />
      <Button
        selected={playing === "DRUMS"}
        onClick={() => playTrack("DRUMS")}
      />
      <Button
        selected={playing === "PERCUSSION"}
        onClick={() => playTrack("PERCUSSION")}
      />
      <Button
        selected={playing === "SAMPLER"}
        onClick={() => playTrack("SAMPLER")}
      />
      <Button
        selected={playing === "SYNTH"}
        onClick={() => playTrack("SYNTH")}
      />
    </Container>
  );
}

const Button = styled.div`
    border: solid 10px ${props => props.theme.colors.primary};
    background-color: ${props =>
      props.selected ? props.theme.colors.primary : "white"};
    border-radius: 50%;
    width: 100px;
    height: 100px;
    cursor pointer;
    &.selected {
        background-color: ${props => props.theme.colors.primary};
    }
`;

const Container = styled.section`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
