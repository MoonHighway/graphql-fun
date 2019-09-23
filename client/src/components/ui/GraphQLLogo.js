import React from "react";
import logo from "./assets/graphql-logo.svg";
import styled from "styled-components";

export const GraphQLLogo = ({
  width = "90%",
  margin = "0",
  children = "GraphQL Fun!!!"
}) => (
  <Container width={width} margin={margin}>
    <img src={logo} alt="GraphQL Fun" />
    <h1>{children}</h1>
  </Container>
);

const Container = styled.div`
  margin-top: ${props => props.margin}
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  img {
    width: ${props => props.width};
  }

  h1 {
    font-family: ${props => props.theme.fonts.fun};
    color: ${props => props.theme.colors.primary};
    font-size: 3em;
  }
`;
