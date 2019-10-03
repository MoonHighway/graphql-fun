import { createNewGame } from "../db";

export const Mutation = {
  async startWejay(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start wejay");
    }
    const game = await createNewGame("Wejay");
    pubsub.publish("game", { game });
    pubsub.publish("new-instructions");
    return game;
  }
};
