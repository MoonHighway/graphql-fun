export const Query = {
  playerCount: (_, { onDeck = false }, { players, playersOnDeck }) =>
    onDeck ? playersOnDeck.length : players.length,
  allPlayers: async (
    _,
    { onDeck = false, first },
    { db, players, playersOnDeck }
  ) => {
    if (first) {
      var slicedPlayers = players.slice(0, first);
      return slicedPlayers;
    } else if (onDeck) {
      return playersOnDeck;
    } else {
      var pipeline = db.pipeline();
      players.forEach(token => pipeline.get(token));
      const values = await pipeline.exec();

      return values.map(([, player]) => JSON.parse(player));
    }
  }
};

var once = true;

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

// returnpubsub.asyncIterator('new-instructions')
//             const next = iterator.next
//             iterator.next = () => next()
//                 .then(() => ({ value: { instructions: currentPlayer } }))

//             return iterator
