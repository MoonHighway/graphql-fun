export const Query = {
    playerCount: (_, { onDeck = false }, { players, playersOnDeck }) =>
        onDeck ? playersOnDeck.length : players.length,
    allPlayers: (_, { onDeck = false }, { players, playersOnDeck }) =>
        onDeck ? playersOnDeck : players
}

export const Subscription = {

    instructions: {
        subscribe(_, args, { pubsub, currentPlayer }) {
                
            if (!currentPlayer) {
                throw new Error('a player must be logged in to subscribe to instructions')
            }

            const iterator = pubsub.asyncIterator('new-instructions')
            const next = iterator.next
            iterator.next = () => next()
                .then(() => ({ value: { instructions: currentPlayer } }))

            return iterator

        }
    }

}