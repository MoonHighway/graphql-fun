import React from "react";
import styled from "styled-components";
import { GraphQLLogo } from "./";

export const WelcomeScreen = ({ children }) => (
  <Container>
    <GraphQLLogo />
    {children}
  </Container>
);

const Container = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: Arial;
`;
