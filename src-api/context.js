import { PubSub } from 'apollo-server-express'

global.players = []
global.teams = []
global.playersOnDeck = []
global.availablePlayers = []

const pubsub = new PubSub()

export const context = ({ req, connection }) => ({
    pubsub,
    players: global.players,
    teams: global.teams,
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers,
    currentPlayer: global.players
        .find(p => p.token === (connection ? 
            connection.context.Authorization : 
            req.headers.authorization
        ))
})

