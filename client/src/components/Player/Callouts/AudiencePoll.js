import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { storage } from "../../../FunProvider";
import gql from "graphql-tag";
import styled from "styled-components";

const PLAYER_VOTE = gql`
  mutation vote($tally: Boolean!) {
    vote(tally: $tally)
  }
`;

export function AudiencePoll({ poll: { question, yesLabel, noLabel } }) {
  const [yourVote, setVote] = useState();
  const [sendVote] = useMutation(PLAYER_VOTE);

  const vote = val => {
    if (yourVote === true && val === true) return;
    if (yourVote === false && val === false) return;
    storage.setItem("vote", val ? "yes" : "no");
    sendVote({ variables: { tally: val } });
    setVote(val);
  };

  useEffect(() => {
    const yourVote = storage.getItem("vote");
    if (yourVote === "yes") setVote(true);
    if (yourVote === "no") setVote(false);
    return () => {
      storage.removeItem("vote");
    };
  }, []);

  useEffect(() => {
    storage.removeItem("vote");
  }, [question, yesLabel, noLabel]);

  return (
    <Container>
      <Button
        yes={true}
        selected={yourVote === true}
        onClick={() => vote(true)}
      >
        {yesLabel || "yes"}
      </Button>
      <Button
        yes={false}
        selected={yourVote === false}
        onClick={() => vote(false)}
      >
        {noLabel || "no"}
      </Button>
    </Container>
  );
}

const Button = styled.div`
  font-size: 3em;
  font-family: ${props =>
    props.selected ? props.theme.fonts.fun : props.theme.fonts.creativeLight};
  background-color: ${props =>
    props.selected
      ? props.yes
        ? props.theme.colors.contrast
        : props.theme.colors.primary
      : "transparent"};
  color: ${props =>
    props.selected
      ? props.theme.colors.dark
      : props.yes
      ? props.theme.colors.contrast
      : props.theme.colors.primary};
  width: calc(100% - 0.5em);
  height: calc(100% - 0.5em);
  margin: 0.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
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
