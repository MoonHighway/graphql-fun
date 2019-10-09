import {
  createTestPlayer,
  createPlayer,
  removePlayer,
  countPlayers
} from "../db";

export const Query = {
  me: (_, args, { currentPlayer }) => currentPlayer,
  githubAuthorizationUrl: () =>
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
};

export const Mutation = {
  async githubAuthorization(_, { code }, { players, pubsub }) {
    let result =
      code.trim() === "TEST_PLAYER"
        ? createTestPlayer()
        : await createPlayer(code);
    pubsub.publish("connection", {
      connection: {
        playerCount: await countPlayers(),
        status: "CONNECTED",
        player: result.player
      }
    });
    return result;
  },

  async logout(_, args, { currentPlayer, pubsub }) {
    if (currentPlayer) {
      console.log(`${currentPlayer.login} is logging out`);
      removePlayer(currentPlayer.token);
      pubsub.publish("connection", {
        connection: {
          playerCount: await countPlayers(),
          status: "DISCONNECTED",
          player: currentPlayer
        }
      });
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
