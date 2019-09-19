import React from "react";
import { ExitButton } from "./";
import styled from "styled-components";

export const WaitingForInstructions = ({ name, avatar, onLeave = f => f }) => (
  <Container>
    <figure>
      <img src={avatar} width={48} height={48} alt="" />
    </figure>
    <h1>
      <span>Welcome,</span>
      <span>{name}</span>
    </h1>
    <ExitButton onClick={onLeave} />
  </Container>
);

const Container = styled.div`
  background-color: ${props => props.theme.colors.dark};
  align-self: stretch;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  figure {
    flex-grow: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 60%;
      height: 60%;
      border-radius: 50%;
    }
  }

  h1 {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;
    font-size: 2.75em;
    font-family: ${props => props.theme.fonts.creativeLight};
  }
`;
