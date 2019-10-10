import React, { useEffect } from "react";
import { useMusic } from "../../../../hooks";
import styled from "styled-components";
import s1 from "./assets/s1.mp3";
import s2 from "./assets/s3.mp3";
import s3 from "./assets/s4.mp3";
import s4 from "./assets/s5.mp3";
import bgNode from "./assets/node.JPG";
import bgReact from "./assets/react.JPG";
import bgGraphql from "./assets/graphql.JPG";
import bgTypescript from "./assets/typescript.JPG";
import logoReact from "./assets/logo-react.svg";
import logoNode from "./assets/logo-node.png";
import logoGraphQL from "./assets/graphql.svg";
import logoTS from "./assets/logo-typescript.png";
import { LoadingScreen } from "../../../ui";

const trackMap = {
  GRAPHQL: "BASS",
  NODE: "DRUMS",
  REACT: "PERCUSSION",
  TYPESCRIPT: "SAMPLER"
};

const bgMap = {
  NODE: bgNode,
  REACT: bgReact,
  GRAPHQL: bgGraphql,
  TYPESCRIPT: bgTypescript
};

export function Fightjay({ game: { results } }) {
  const { loading, playTrack } = useMusic([s1, s2, s3, s4]);

  useEffect(() => {
    if (loading) return;
    playTrack(trackMap[results.leader]);
  }, [loading, results.leader]);

  if (loading) return <LoadingScreen />;
  return (
    <Container background={bgMap[results.leader]}>
      <ResultRow>
        <Result>
          <img src={logoReact} alt="" />
          {results.react}
        </Result>
        <Result>
          <img src={logoNode} alt="" />
          {results.node}
        </Result>
        <Result>
          <img src={logoGraphQL} alt="" />
          {results.graphql}
        </Result>
        <Result>
          <img src={logoTS} alt="" />
          {results.typescript}
        </Result>
      </ResultRow>
    </Container>
  );
}

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0.25em;
  font-size: 2em;
  font-family: ${props => props.theme.fonts.marker};
`;

const ResultRow = styled.div`
  display: flex;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  border-radius: 10px;
`;

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
