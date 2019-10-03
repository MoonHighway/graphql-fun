import { createNewGame } from "../db";

export const Mutation = {
  async startPerfIsRightFinal(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start the Perf is Right Final Round");
    }
    const game = await createNewGame("Perf is Right - FINAL", "playing", 1, 1);
    pubsub.publish("game", { game });
    pubsub.publish("new-instructions");
    return game;
  }
};
