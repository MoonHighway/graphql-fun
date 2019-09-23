import React from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";

export const LoadingScreen = () => (
  <Container>
    <SyncLoader size={25} loading={true} color="black" />
  </Container>
);

const Container = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  div > div {
    background-color: ${props => props.theme.colors.primary};
  }
`;
