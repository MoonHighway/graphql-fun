import { createNewGame } from "../db";

export const Mutation = {
  async startFightjay(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start the Fightjay");
    }
    const game = await createNewGame("Fightjay");
    pubsub.publish("game", { game });
    pubsub.publish("new-instructions");
    return game;
  }
};
