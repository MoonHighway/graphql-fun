import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { storage } from "../../../../FunProvider";
import gql from "graphql-tag";

const VOTE_MUTATION = gql`
  mutation fight($choice: FightTech!) {
    fight(choice: $choice)
  }
`;

export function Fightjay() {
  const [selectedTech, setTech] = useState();
  const [fight] = useMutation(VOTE_MUTATION);

  useEffect(() => {
    const choice = storage.getItem("selectedTech");
    if (choice) setTech(choice);
    return () => storage.removeItem("selectedTech");
  }, []);

  const vote = choice => {
    if (selectedTech === choice) return;
    fight({ variables: { choice } });
    setTech(choice);
    storage.setItem("selectedTech", choice);
  };

  return (
    <Container>
      <Button selected={selectedTech === "NODE"} onClick={() => vote("NODE")}>
        Node
      </Button>
      <Button selected={selectedTech === "REACT"} onClick={() => vote("REACT")}>
        React
      </Button>
      <Button
        selected={selectedTech === "GRAPHQL"}
        onClick={() => vote("GRAPHQL")}
      >
        GraphQL
      </Button>
      <Button
        selected={selectedTech === "TYPESCRIPT"}
        onClick={() => vote("TYPESCRIPT")}
      >
        Typescript
      </Button>
    </Container>
  );
}

const Button = styled.div`
  font-size: 1em;
  font-family: ${props =>
    props.selected ? props.theme.fonts.fun : props.theme.fonts.creativeLight};
  background-color: ${props =>
    props.selected ? props.theme.colors.primary : "transparent"};
  color: ${props =>
    props.selected ? props.theme.colors.dark : props.theme.colors.primary};
  width: calc(100% - 2em);
  height: calc(100% - 2em);
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: solid 10px
    ${props =>
      props.yes ? props.theme.colors.contrast : props.theme.colors.primary};
  cursor: ${props => (props.selected ? "none" : "pointer")};
`;

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: ${props => props.theme.fonts.creativeLight};
  color: white;
  font-size: 3em;
`;
