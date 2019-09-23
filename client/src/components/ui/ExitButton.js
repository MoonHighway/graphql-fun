import React from "react";
import styled from "styled-components";
import { MdExitToApp } from "react-icons/md";

export const ExitButton = ({ onClick = f => f }) => (
  <Container onClick={onClick}>
    <MdExitToApp />
    <span>leave</span>
  </Container>
);

const Container = styled.div`
  border: solid 1px white;
  align-self: stretch;
  margin: 0.4em;
  padding: 0.4em;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: ${props => props.theme.fonts.creativeLight};
  font-size: 2.5em;
  span {
    padding-left: 0.4em;
  }
`;
