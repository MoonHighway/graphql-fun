import React from "react";
import { ExitButton } from "./ExitButton";
import nametag from "./assets/nametag.png";

import styled from "styled-components";

export const WaitingForInstructions = ({ name, onLeave = f => f }) => (
  <Container>
    <div>MoonTahoe</div>
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${nametag});
  background-size: contain;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center center;
  div {
    font-size: 4em;
    padding: 0;
    margin: 0;
    color: black;
    font-family: ${props => props.theme.fonts.marker};
    transform: rotate(90deg);
    position: relative;
    top: 50px;
    font-weight: bold;
  }
`;
