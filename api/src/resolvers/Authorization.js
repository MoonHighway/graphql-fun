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

  logout(_, args, { currentPlayer }) {
    console.log(`${currentPlayer} is logging out`);
    if (currentPlayer) {
      removePlayer(currentPlayer.token);
    }
  }
};

export const Subscription = {
  me: {
    resolve: async (payload, args, { currentPlayer }, info) => currentPlayer,
    subscribe(_, args, { pubsub, currentPlayer }) {
      if (!currentPlayer) {
        throw new Error(
          "a player must be logged in to subscribe to instructions"
        );
      }
      return pubsub.asyncIterator("new-instructions");
    }
  }
};
