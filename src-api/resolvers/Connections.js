export const Query = {
    playerCount: (_, { onDeck = false }, { players, playersOnDeck }) =>
        onDeck ? playersOnDeck.length : players.length,
    allPlayers: (_, { onDeck = false }, { players, playersOnDeck }) =>
        onDeck ? playersOnDeck : players
}
