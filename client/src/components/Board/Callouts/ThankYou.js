import React, { useEffect, useState } from "react";
import styled from "styled-components";
import music from "./assets/thankYou.mp3";
import bgThankYou from "./assets/thankYou.JPG";
import { LoadingScreen } from "../../ui";
import { loadAudio } from "../../../lib";

export function ThankYou() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let song;
    (async () => {
      song = await loadAudio(music);
      song.loop = true;
      song.play();
      setLoading(false);
    })();
    return () => {
      if (song) {
        song.src = null;
      }
    };
  }, []);

  if (loading) return <LoadingScreen />;
  return <Container background={bgThankYou}></Container>;
}

const Container = styled.div`
  align-self: stretch;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1.5em;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: right bottom;

  > div {
    img {
      width: 40px;
    }
  }
`;
