import gql from "graphql-tag";

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
