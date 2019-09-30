import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import { LoadingScreen } from "../ui";

export const ALL_PLAYERS = gql`
  query allPlayers {
    playerCount
    allPlayers {
      avatar
      login
      name
      hometown
      team {
        color {
          name
        }
      }
    }
  }
`;

export default function Players() {
  const { loading, data } = useQuery(ALL_PLAYERS, { pollInterval: 1000 });

  if (loading) return <LoadingScreen />;

  console.log(data);

  return (
    <Container>
      <h1>{data.playerCount} Players</h1>
      {data.allPlayers.map(p => (
        <div key={p.login}>
          <div>
            <img src={p.avatar} alt="" />
          </div>
          <div>
            <h2>{p.login}</h2>
            <p>
              {p.name} - {p.hometown}
            </p>
          </div>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 1em;
  > div {
    display: flex;
    margin: 0.25em 0;
    border: solid 1px #ccc;
    padding: 0.5em;
    align-items: center;
    > div:first-child {
      flex-basis: 20%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
`;
