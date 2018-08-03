export const Mutation = {
    startGame: (root, { title }, { currentGame, playersOnDeck }) => {
        if (!currentGame) {
            switch (title.toLowerCase()) {

                case "wejay":
                    if (playersOnDeck.length < 5) {
                        throw new Error('WeJay requires at least 5 players')
                    }
                    let instruments = 'BASS,DRUMS,PERCUSSION,SAMPLER,SYNTH'.split(',')

                    currentGame = {
                        title,
                        tracks: playersOnDeck.map((p, i) => ({
                            ...p,
                            instrument: instruments[i]
                        })),
                        playerCount: playersOnDeck.length
                    }

                    break
            }
        }
        return currentGame
    },
    endGame: (root, args, { currentGame, playersOnDeck }) => {
        currentGame = null
        playersOnDeck = null
        return true
    }
}