import {
  createNewGame,
  getPlayersOnDeck,
  countDeck,
  getCurrentGame,
  guess
} from "../db";
import { getUnpackedSettings } from "http2";

export const Mutation = {
  async startPerfIsRight(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start the Perf is Right");
    }
    const game = await createNewGame("Perf is Right", "picking players", 4, 4);
    pubsub.publish("game", { game });
    pubsub.publish("new-instructions");
    return game;
  },
  async guess(_, { perf }, { currentPlayer, pubsub }) {
    if (!currentPlayer) {
      throw new Error(`you must be logged in to make a guess`);
    }
    const results = await guess(currentPlayer.login, perf);
    pubsub.publish("game", { game: await getCurrentGame() });
    return results;
  }
};

export const PerfIsRight = {
  minPlayers: () => 4,
  maxPlayers: () => 4,
  playerCount: async () => await countDeck(),
  players: async () => await getPlayersOnDeck()
};
