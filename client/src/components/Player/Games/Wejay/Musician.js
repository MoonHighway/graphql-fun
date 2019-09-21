import React from "react";
import { useToggle } from "../../../../hooks";
import { useMutation } from "@apollo/react-hooks";
import grayButton from "./assets/gray_btn.svg";
import greenButton from "./assets/green_btn.svg";
import styled from "styled-components";
import gql from "graphql-tag";

export const PLAY_MUTATION = gql`
  mutation play {
    play
  }
`;

export const PAUSE_MUTATION = gql`
  mutation pause {
    pause
  }
`;

export default function Musician({ instrument }) {
  const [selected, toggle] = useToggle(false);
  const [play] = useMutation(PLAY_MUTATION);
  const [pause] = useMutation(PAUSE_MUTATION);

  const press = () => {
    selected ? pause() : play();
    toggle();
  };

  return (
    <Container selected={selected}>
      <div onClick={press} />
      <h2>{instrument}</h2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  text-align: center;
  align-self: stretch;
  width: 100%;

  div {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${props =>
      props.selected ? greenButton : grayButton});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 2em;
  }

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    margin-top: 0.25em;
    margin-bottom: 1.25em;
    font-family: ${props => props.theme.fonts.fun};
    color: ${props =>
      props.selected
        ? props.theme.colors.contrast
        : props.theme.colors.primary};
    font-family: ${props =>
      props.selected ? props.theme.fonts.fun : props.theme.fonts.creative};
  }
`;
