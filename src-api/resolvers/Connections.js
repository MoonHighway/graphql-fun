export const Query = {
    playerCount: (_, { onDeck = false }, { players, playersOnDeck }) =>
        onDeck ? playersOnDeck.length : players.length,
    allPlayers: (_, { onDeck = false, first }, { players, playersOnDeck }) => {
        if (first) {
            var slicedPlayers = players.slice(0, first)
            return slicedPlayers
        } else if (onDeck) {
            return playersOnDeck
        } else {
            return players
        }
    }
}

var once = true;

export const Subscription = {

    instructions: {
        resolve: (payload, args, { currentPlayer }, info) => currentPlayer,
        subscribe(_, args, { pubsub, currentPlayer }) {

            if (!currentPlayer) {
                throw new Error('a player must be logged in to subscribe to instructions')
            }

            return pubsub.asyncIterator('new-instructions')
        }
    }

}


// returnpubsub.asyncIterator('new-instructions')
//             const next = iterator.next
//             iterator.next = () => next()
//                 .then(() => ({ value: { instructions: currentPlayer } }))

//             return iterator