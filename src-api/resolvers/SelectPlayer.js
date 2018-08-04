export const Mutation = {
    pickPlayer(root, args) {
        if (!global.availablePlayers.length) {
            global.players.forEach(p => global.availablePlayers.push(p))
        }
        let randomId = Math.floor(Math.random() * global.availablePlayers.length)
        let [player] = global.availablePlayers.splice(randomId, 1)
        global.playersOnDeck.push(player)
        return { count: global.playersOnDeck.length, player }
    },
    putBackPlayer(root, { login }) {
        if (login) {
            var player = global.playersOnDeck.find(p => p.login === login)
            if (!player) {
                throw new Error("No one with that login exists!")
            }
        } else {
            var player = global.playersOnDeck.pop()
        }
        return { count: global.playersOnDeck.length, player }
    }
}