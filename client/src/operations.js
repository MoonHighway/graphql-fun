import gql from "graphql-tag";

const PLAYER_FRAGMENT = `
    fragment PlayerFields on Player {
        login
        name
        avatar
        instrument
        playingGame
        endEvent
        team {
            color { name text }
            players { avatar login }
        }
    }
`;

export const PLAYER_ROOT_QUERY = gql`
  query playerQuery {
    me {
      ...PlayerFields
    }
  }
  ${PLAYER_FRAGMENT}
`;

export const GITHUB_AUTHORIZATION = gql`
  mutation githubAuth($code: String!) {
    githubAuthorization(code: $code) {
      token
      player {
        ...PlayerFields
      }
    }
  }
  ${PLAYER_FRAGMENT}
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const PLAY_MUTATION = gql`
  mutation play {
    play
  }
`;

export const PAUSE_MUTATION = gql`
  mutation pause {
    pause
  }
`;

export const LISTEN_FOR_INSTRUCTIONS = gql`
  subscription instructions {
    instructions {
      ...PlayerFields
    }
  }
  ${PLAYER_FRAGMENT}
`;
