import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { storage } from "../../../../FunProvider";
import gql from "graphql-tag";
import logoReact from "../../../Board/Games/Fightjay/assets/logo-react.svg";
import logoNode from "../../../Board/Games/Fightjay/assets/logo-node.png";
import logoGraphQL from "../../../Board/Games/Fightjay/assets/graphql.svg";
import logoTS from "../../../Board/Games/Fightjay/assets/logo-typescript.png";

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
        <img src={logoNode} alt="node" />
      </Button>
      <Button selected={selectedTech === "REACT"} onClick={() => vote("REACT")}>
        <img src={logoReact} alt="react" />
      </Button>
      <Button
        selected={selectedTech === "GRAPHQL"}
        onClick={() => vote("GRAPHQL")}
      >
        <img src={logoGraphQL} alt="Graphql" />
      </Button>
      <Button
        selected={selectedTech === "TYPESCRIPT"}
        onClick={() => vote("TYPESCRIPT")}
      >
        <img src={logoTS} alt="typescript" />
      </Button>
    </Container>
  );
}

const Button = styled.div`
  flex-basis: calc(50% - 60px);
  background-color: white;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.selected ? "none" : "pointer")};
  margin: 70px 10px;
  border-radius: 20px;
  border: solid 20px
    ${props =>
      props.selected
        ? props.theme.colors.contrast
        : props.theme.colors.primary};
  img {
    width: 80%;
  }
`;

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  font-family: ${props => props.theme.fonts.creativeLight};
  color: white;
  font-size: 3em;
`;
