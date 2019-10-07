import React, { useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { LoadingScreen, WelcomeScreen } from "../ui";
import AuthorizedPlayer from "./AuthorizedPlayer";
import CurrentPlayer from "./CurrentPlayer";
import { AudiencePoll, Spotlight, Faces } from "./Callouts";
import { PerfIsRight, PerfIsRightFinal, Fightjay, Wejay } from "./Games";
import NoSleep from "nosleep.js";
import gql from "graphql-tag";

export const PLAYER_FIELDS = `
  fragment PlayerFields on Player {
    login
    name
    hometown
    avatar
    instructions {
      game {
        name 
        state 
        players {
          login
          guess
        }
        ...on Fightjay {
          results {
            leader
            node
            react
            graphql
            typescript
          }
        }
      }
      callout {
        name
        state
        ...on AudiencePoll {
          results {
            question
            yesLabel
            noLabel
          }
        }
      }
    }
    team {
      color {
        name
        text
      }
      players {
        avatar
        login
      }
    }
  }
`;

export const PLAYER_QUERY = gql`
  query playerQuery {
    me {
      ...PlayerFields
    }
  }
  ${PLAYER_FIELDS}
`;

export const LISTEN_FOR_INSTRUCTIONS = gql`
  subscription listen {
    me {
      ...PlayerFields
    }
  }
  ${PLAYER_FIELDS}
`;

export default function Player() {
  const { loading, data, error } = useQuery(PLAYER_QUERY);
  const { data: playerStatus } = useSubscription(LISTEN_FOR_INSTRUCTIONS);

  useEffect(() => {
    const noSleep = new NoSleep();
    const enableNoSleep = () => {
      noSleep.enable();
      document.removeEventListener("click", enableNoSleep, false);
    };
    document.addEventListener("click", enableNoSleep, false);
    return () => {
      noSleep.disable();
    };
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const currentPlayer = data && data.me ? data.me : null;

  if (!currentPlayer)
    return (
      <WelcomeScreen>
        <AuthorizedPlayer />
      </WelcomeScreen>
    );

  const me = playerStatus ? playerStatus.me : data.me;
  const { game, callout } = playerStatus
    ? playerStatus.me.instructions
    : currentPlayer
    ? data.me.instructions
    : { callout: null, game: null };

  if (callout) {
    switch (callout.name) {
      case "Audience Poll":
        return <AudiencePoll poll={callout.results} />;
      case "Spotlight":
        return <Spotlight />;
      case "Faces":
        return <Faces />;
    }
  }

  if (game) {
    switch (game.name) {
      case "Perf is Right":
        return <PerfIsRight game={game} player={me} />;
      case "Perf is Right - FINAL":
        return <PerfIsRightFinal game={game} />;
      case "Fightjay":
        return <Fightjay game={game} />;
      case "Wejay":
        return <Wejay game={game} />;
    }
  }

  return <CurrentPlayer {...currentPlayer} />;
}
