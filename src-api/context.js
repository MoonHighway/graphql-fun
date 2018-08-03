import { PubSub } from 'apollo-server-express'

global.players = []
global.teams = []
global.playersOnDeck = []
global.availablePlayers = []

const pubsub = new PubSub()

export const context = ({ req, connection }) => {

    let token

    if (connection) {
        console.log('connection context: ', connection.context.Authorization)
        token = connection.context.Authorization
    } else {
        console.log('request context: ', req.headers.authorization)
        token = req.headers.authorization
    }

    let currentPlayer = global.players.find(p => p.token === token)

    console.log(currentPlayer && currentPlayer.name)

    return ({
        pubsub,
        players: global.players,
        teams: global.teams,
        currentPlayer,
        playersOnDeck: global.playersOnDeck,
        availablePlayers: global.availablePlayers
    })
}
