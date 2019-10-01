import {
  countPlayers,
  countDeck,
  getPlayersOnDeck,
  getAllPlayers
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
