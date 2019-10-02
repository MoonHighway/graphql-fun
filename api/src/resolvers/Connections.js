import {
  countPlayers,
  countDeck,
  getPlayersOnDeck,
  getAllPlayers,
  clearAllKeys
} from "../db";

export const Query = {
  playerCount: (_, { onDeck = false }) =>
    onDeck ? countDeck() : countPlayers(),
  allPlayers: async (_, { onDeck = false, first }) => {
    const players = getAllPlayers();
    if (first) {
      var slicedPlayers = players.slice(0, first);
      return slicedPlayers;
    } else if (onDeck) {
      return await getPlayersOnDeck();
    } else {
      return players;
    }
  }
};

export const Mutation = {
  async end(_, args, { isAdmin }) {
    if (!isAdmin) {
      throw new Error("only Eve can end the session");
    }
    await clearAllKeys();
    return true;
  }
};
