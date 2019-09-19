import gql from "graphql-tag";

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
