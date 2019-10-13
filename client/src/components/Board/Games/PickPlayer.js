import React from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { LoadingScreen } from "../../ui";
import gql from "graphql-tag";
import tile from "./PerfIsRight/assets/tile.png";
import perfLogo from "./PerfIsRight/assets/logo-perf.png";
import nametag from "../../ui/assets/nametag-horz.png";

//
//  LEFT TODO:
//
//   - [x] Style Player Face and NameTag
//   - [x] Style Pick Player and Start Game Buttons
//   - [ ] Show All 5 players before starting the game
//   - [ ] Click a player to put them back
//

const PICK_PLAYER = gql`
  mutation pick {
    pickPlayer {
      count
      player {
        login
        avatar
        name
      }
    }
  }
`;

const PUT_BACK = gql`
  mutation putback($login: ID) {
    putBackPlayer(login: $login) {
      count
    }
  }
`;

const Avatar = ({ avatar, login, onClick = f => f }) => (
  <PlayerAvatar>
    <img
      className="playerFace"
      src={avatar}
      alt=""
      width={100}
      height={100}
      onClick={onClick}
    />
    <div className="nametag">
      <span>{login}</span>
    </div>
  </PlayerAvatar>
);

export default function PickPlayer({
  onStartGame = f => f,
  maxPlayers = 100,
  minPlayers = 1,
  players = [],
  count = 0
}) {
  const [pick, { data, loading, error }] = useMutation(PICK_PLAYER);
  const [putBack] = useMutation(PUT_BACK);
  if (loading) return <LoadingScreen />;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  const playerCount = data ? data.pickPlayer.count : count;
  const morePlayers = maxPlayers - playerCount;

  if (!playerCount)
    return (
      <Container>
        <Logo src={perfLogo} onClick={pick} alt="the perf is right" />
      </Container>
    );

  const { login, avatar } =
    !data && players.length ? players[0] : data.pickPlayer.player;

  return (
    <Container>
      <div>
        <Avatar
          login={login}
          avatar={avatar}
          onClick={async () => {
            if (window.confirm(`are you sure you want to put ${login} back?`)) {
              await putBack({ variables: { login } });
              window.location.reload();
            }
          }}
        />
        {playerCount >= minPlayers && playerCount <= maxPlayers && (
          <button onClick={() => onStartGame()}>START GAME!</button>
        )}
        {playerCount < maxPlayers && (
          <button onClick={pick}>
            Pick {morePlayers} more Player{morePlayers > 1 && "s"}
          </button>
        )}
      </div>
    </Container>
  );
}

const PlayerAvatar = styled.section`
  position: relative;
  div.nametag {
    position: absolute;
    background-image: url(${nametag});
    background-size: cover;
    width: 300px;
    height: 185px;
    bottom: 50px;
    right: -90px;
    transform: rotate(-25deg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${props => props.theme.fonts.marker};
    font-size: 1.5em;
    > span {
      position: relative;
      left: 20px;
    }
  }
`;

const Logo = styled.img`
  width: 500px;
  border-radius: none !important;
`;

const Container = styled.div`
  align-self: stretch;
  width: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${tile});
  background-size: 100px;
  img.playerFace {
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: solid 20px rgb(175, 0, 0);
  }

  h1 {
    text-align: center;
    margin: 0.5em;
    font-size: 4em;
    color: white;
    font-family: ${props => props.theme.fonts.fun};
  }

  div {
    text-align: center;
  }

  button {
    border: solid 1px white;
    background-color: transparent;
    color: white;
    font-family: ${props => props.theme.fonts.creativeLight};
    font-size: 3em;
    padding: 0.5em 1em;

    &:hover {
      background-color: ${props => props.theme.colors.contrast};
      color: ${props => props.theme.colors.dark};
    }
  }
`;
