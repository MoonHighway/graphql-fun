import React, { useEffect } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { useMusic } from "../../../../hooks";
import { LoadingScreen } from "../../../ui";
import Musician from "./Musician";
import Audience from "./Audience";
import styled from "styled-components";
import gql from "graphql-tag";
import bass from "./assets/bass.mp3";
import drums from "./assets/drums.mp3";
import percussion from "./assets/percussion.mp3";
import sampler from "./assets/sampler.mp3";
import synth from "./assets/synth.mp3";

export const LISTEN_FOR_GAME_CHANGES = gql`
  subscription {
    gameChange {
      playingMusic {
        instrument
      }
      faces {
        login
        avatar
        team {
          color {
            name
          }
        }
      }
    }
  }
`;

export default function Wejay({ players }) {
  const { loading, tracks } = useMusic([
    bass,
    drums,
    percussion,
    sampler,
    synth
  ]);
  const { data, error } = useSubscription(LISTEN_FOR_GAME_CHANGES);

  useEffect(() => {
    if (!data) return;
    playTrack(data);
  }, [data]);

  const instruments = data =>
    data.gameChange.playingMusic.map(({ instrument }) => instrument);

  const isPlayingMusic = (data, instrument) =>
    data && -1 !== instruments(data).indexOf(instrument);

  const playTrack = data => {
    if (data) {
      playSound(instruments(data));
    }
  };

  const playSound = instruments =>
    Object.keys(tracks).forEach(key => {
      console.log(tracks);
      return (tracks[key].volume = instruments.indexOf(key) !== -1 ? 1 : 0);
    });

  if (loading) return <LoadingScreen />;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <Container>
      {data && data.gameChange.faces.length ? (
        <Audience faces={data.gameChange.faces} />
      ) : null}
      {players.map(p => (
        <Musician
          key={p.login}
          avatar={p.avatar}
          login={p.login}
          instrument={p.instrument}
          playingMusic={isPlayingMusic(data, p.instrument)}
        />
      ))}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  text-align: center;

  h1:first-child {
    display: none;
  }
`;
