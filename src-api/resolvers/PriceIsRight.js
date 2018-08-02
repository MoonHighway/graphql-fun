export const Mutation = {
    comeOnDown(root, args, { players, playersOnDeck }) {
        let randomId = Math.floor(Math.random() * players.length)
        let player = players.splice(randomId, 1)[0]
        playersOnDeck.push(player)
        return player
    },
    kickOut(root, { login }, { playersOnDeck }) {
        if (login) {
            var player = playersOnDeck.find(p => p.login === login)
            if (!player) {
                throw new Error("No one with that login exists!")
            }
        } else {
            var player = playersOnDeck.pop()
        }
        return player
    }
}