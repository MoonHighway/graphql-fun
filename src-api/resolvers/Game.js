export const Query = {
    currentGame: (root, args, { currentGame }) => currentGame
}

export const Mutation = {
    startGame: (root, args, { currentGame, playersOnDeck, pubsub }) => {

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

        currentGame.faces = []

        pubsub.publish('new-instructions')

        return currentGame
    },
    endGame: (root, args, { currentGame, playersOnDeck, pubsub }) => {
        global.currentGame = {}
        global.playersOnDeck = []
        pubsub.publish('new-instructions')
        return true
    },
    play: (root, args, { currentGame, currentPlayer, pubsub }) => {

        let musician = currentGame.players.find(p => p.login === currentPlayer.login)

        if (musician) {
            if (!currentGame.playingMusic.map(m => m.login).includes(musician.login)) {
                currentGame.playingMusic.push(musician)
                pubsub.publish('game-changer', { gameChange: currentGame })
            }
        } else {
            if (!currentGame.faces.map(m => m.login).includes(currentPlayer.login)) {
                currentGame.faces.push(currentPlayer)
                pubsub.publish('game-changer', { gameChange: currentGame })
            }
        }

        return true
    },
    pause: (root, args, { currentGame, currentPlayer, pubsub }) => {

        let musician = currentGame.players.find(p => p.login === currentPlayer.login)

        if (musician) {
            if (currentGame.playingMusic.map(p => p.login).includes(musician.login)) {
                currentGame.playingMusic = currentGame.playingMusic.filter(p => p.login !== musician.login)
                pubsub.publish('game-changer', { gameChange: currentGame })
            }
        } else {
            if (currentGame.faces.map(f => f.login).includes(currentPlayer.login)) {
                currentGame.faces = currentGame.faces.filter(p => p.login !== currentPlayer.login)
                pubsub.publish('game-changer', { gameChange: currentGame })
            }
        }

        return true

    }
}

export const Subscription = {
    gameChange: {
        subscribe: (_, args, { pubsub }) => pubsub.asyncIterator('game-changer')
    }
}
