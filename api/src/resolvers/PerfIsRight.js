import { createNewGame } from "../db";

export const Mutation = {
  async startPerfIsRight(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start the Perf is Right");
    }
    const game = await createNewGame("Perf is Right", "picking players", 4, 4);
    pubsub.publish("game", { game });
    pubsub.publish("new-instructions");
    return game;
  }
};