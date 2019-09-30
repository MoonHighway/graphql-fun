import React from "react";
import Players from "./Players";
import Games from "./Games";
import styled from "styled-components";

export default function Admin() {
  return (
    <Container>
      <Players />
      <Games />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  font-family: ${props => props.theme.fonts.creativeLight};
  h1 {
    font-family: ${props => props.theme.fonts.creative};
  }

  > section:first-child {
    border: solid 4px white;
    flex-basis: 30%;
    overflow-y: scroll;
    height: calc(100% - 8px);
  }

  > section:last-child {
    flex-basis: 70;
    background-color: white;
    width: 100%;
    height: calc(100% - 8px);
  }
`;
