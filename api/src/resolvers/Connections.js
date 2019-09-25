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
      return getPlayersOnDeck();
    } else {
      return players;
    }
  }
};

export const Subscription = {
  instructions: {
    resolve: (payload, args, { currentPlayer }, info) => currentPlayer,
    subscribe(_, args, { pubsub, currentPlayer }) {
      if (!currentPlayer) {
        throw new Error(
          "a player must be logged in to subscribe to instructions"
        );
      }
      return pubsub.asyncIterator("new-instructions");
    }
  }
};
