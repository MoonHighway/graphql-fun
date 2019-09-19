import React from "react";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";

export const GithubLoginButton = ({ onClick = f => f }) => (
  <Container onClick={onClick} data-test="login">
    <FaGithub /> Sign In with GitHub
  </Container>
);

const Container = styled.div`
  color: white;
  border: solid 1px white;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2em;
  padding: 0.5em;
  svg {
    font-size: 1.3em;
    margin-right: 10px;
  }
`;
