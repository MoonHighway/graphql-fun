export const Mutation = {
    pickPlayer(root, args, { players, playersOnDeck, availablePlayers }) {
        if (!availablePlayers.length) {
            players.forEach(p => availablePlayers.push(p))
        }
        let randomId = Math.floor(Math.random() * availablePlayers.length)
        let [player] = global.availablePlayers.splice(randomId, 1)
        playersOnDeck.push(player)
        return { count: playersOnDeck.length, player }
    },
    putBackPlayer(root, { login }, { playersOnDeck }) {
        if (login) {
            var player = global.playersOnDeck.find(p => p.login === login)
            if (!player) {
                throw new Error("No one with that login exists!")
            }
        } else {
            var player = global.playersOnDeck.pop()
        }
        return { count: playersOnDeck.length, player }
    }
}