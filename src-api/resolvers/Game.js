export const Query = {
    currentGame: (root, args, { currentGame }) => currentGame
}

export const Mutation = {
    startGame: (root, args, { currentGame, playersOnDeck }) => {

        if (playersOnDeck.length < 5) {
            throw new Error('WeJay requires at least 5 players')
        }
        let instruments = 'BASS,DRUMS,PERCUSSION,SAMPLER,SYNTH'.split(',')

        currentGame.players = playersOnDeck.map((p, i) => ({
            ...p,
            instrument: instruments[i]
        }))

        currentGame.playerCount = playersOnDeck.length

        currentGame.playingMusic = []

        return currentGame
    },
    endGame: (root, args, { currentGame, playersOnDeck }) => {
        currentGame = null
        playersOnDeck = null
        return true
    },
    play: (root, args, { currentGame, currentPlayer }) => {
        let { instrument } = currentGame.players.find(p => p.login === currentPlayer.login)
        if (!currentGame.playingMusic.includes(instrument)) {
            currentGame.playingMusic.push(instrument)
        }
        return true
    },
    pause: (root, args, { currentGame, currentPlayer }) => {
        let { instrument } = currentGame.players.find(p => p.login === currentPlayer.login)
        if (currentGame.playingMusic.includes(instrument)) {
            currentGame.playingMusic = currentGame.playingMusic.filter(i => i !== instrument)
        }

        return true
    }
}
