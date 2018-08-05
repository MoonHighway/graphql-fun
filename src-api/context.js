import { PubSub } from 'apollo-server-express'
import samplePlayers from './sample-data/test-users.json'
import sampleGame from './sample-data/test-game.json'

global.players = samplePlayers
global.teams = []
global.playersOnDeck = []
global.availablePlayers = []
global.currentGame = sampleGame

const pubsub = new PubSub()
pubsub.ee.setMaxListeners(1500)

export const context = ({ req, connection }) => ({
    pubsub,
    players: global.players,
    teams: global.teams,
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers,
    currentGame: global.currentGame,
    currentPlayer: global.players
        .find(p => p.token === (connection ?
            connection.context.Authorization :
            req.headers.authorization
        ))
})
