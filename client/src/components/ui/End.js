import React from "react";
import styled from "styled-components";
import eve from "./assets/follow-eve.jpg";
import { TwitterButton } from "./TwitterButton";

export const End = () => (
  <Container>
    <figure>
      <img src={eve} alt="Eve Porcello" />
    </figure>
    <h1>Thank You!!!</h1>
    <TwitterButton />
  </Container>
);

const Container = styled.div`
  background-color: ${props => props.theme.colors.dark};
  align-self: stretch;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  h1 {
    font-family: ${props => props.theme.fonts.fun};
  }

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
