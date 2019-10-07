import {
  createNewGame,
  getPlayersOnDeck,
  countDeck,
  getCurrentGame,
  guess,
  pickWinner,
  getWinner,
  addMutationDuration
} from "../db";

export const Mutation = {
  async startPerfIsRight(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start the Perf is Right");
    }
    const game = await createNewGame("Perf is Right", "picking players", 4, 4);
    pubsub.publish("game", { game });
    return game;
  },
  async guess(_, { perf }, { currentPlayer, pubsub }) {
    if (!currentPlayer) {
      throw new Error(`you must be logged in to make a guess`);
    }
    pubsub.publish("performance", { performance: currentPlayer.login });
    const results = await guess(currentPlayer.login, perf);
    pubsub.publish("game", { game: await getCurrentGame() });
    return results;
  },
  async showWinner(_, args, { pubsub }) {
    const winner = await pickWinner();
    pubsub.publish("game", { game: await getCurrentGame() });
    return winner;
  },
  async sendMeasure(_, { duration }, { currentPlayer, pubsub }) {
    if (!currentPlayer) {
      throw new Error("have to be logged in to send a measure");
    }
    await addMutationDuration(duration, currentPlayer.login);
    pubsub.publish("game", { game: await getCurrentGame() });
    return true;
  }
};

export const PerfIsRight = {
  minPlayers: () => 4,
  maxPlayers: () => 4,
  playerCount: async () => await countDeck(),
  players: async () => await getPlayersOnDeck(),
  winner: async () => await getWinner()
};
