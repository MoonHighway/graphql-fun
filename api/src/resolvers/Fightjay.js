import { createNewGame, getCurrentGame, fightVote } from "../db";

export const Mutation = {
  async startFightjay(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start the Fightjay");
    }
    const game = await createNewGame("Fightjay");
    pubsub.publish("game", { game });
    pubsub.publish("new-instructions");
    return game;
  },
  async fight(_, { choice }, { currentPlayer, pubsub }) {
    if (!currentPlayer) throw new Error("you must be logged in to fight");
    await fightVote(currentPlayer.login, choice);
    pubsub.publish("game", { game: await getCurrentGame() });
    return true;
  }
};

export const Fightjay = {
  minPlayers: () => 0,
  maxPlayers: () => 0,
  playerCount: () => 0,
  players: () => []
};
