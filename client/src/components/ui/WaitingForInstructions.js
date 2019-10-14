import React from "react";
import nametag from "./assets/nametag.png";
import { IoIosExit } from "react-icons/io";
import styled from "styled-components";

export const WaitingForInstructions = ({ name, onLeave = f => f }) => (
  <Container textLength={name.length}>
    <div onClick={onLeave}>
      {name}
      <IoIosExit onClick={onLeave} />
    </div>
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
    font-size: ${props =>
      props.textLength < 6 ? "10em" : props.textLength < 15 ? "6em" : "3em"};
    padding: 0;
    margin: 0;
    color: black;
    font-family: ${props => props.theme.fonts.marker};
    transform: rotate(90deg);
    position: relative;
    top: 50px;
    font-weight: bold;
  }
  svg {
    margin-left: 0;
  }
`;
