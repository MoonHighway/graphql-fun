import { clearCurrentGame, getCurrentGame } from "../db";

export const Query = {
  game: async () => await getCurrentGame()
};

export const Mutation = {
  async endGame(_, args, { pubsub }) {
    await clearCurrentGame();
    pubsub.publish("new-instructions");
    pubsub.publish("game", { game: null });
    return true;
  }
};

export const Subscription = {
  game: {
    subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("game")
  }
};

export const Game = {
  __resolveType: parent => {
    if (parent.name === "Perf is Right") return "PerfIsRight";
    if (parent.name === "Perf is Right - FINAL") return "PerfIsRightFinal";
    if (parent.name === "Wejay") return "Wejay";
    if (parent.name === "Fightjay") return "Fightjay";
  }
};
