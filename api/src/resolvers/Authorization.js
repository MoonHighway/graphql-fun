import { createTestPlayer, createPlayer, removePlayer } from "../db";

export const Query = {
  me: (_, args, { currentPlayer }) => currentPlayer,
  githubAuthorizationUrl: () =>
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
};

export const Mutation = {
  async githubAuthorization(_, { code }, { players }) {
    if (code.trim() === "TEST_PLAYER") {
      return createTestPlayer(players);
    }
    return createPlayer(code);
  },

  logout(_, args, { db, players, currentPlayer }) {
    console.log(`${currentPlayer} is logging out`);
    if (currentPlayer) {
      removePlayer(currentPlayer.token);
    }
  }
};
