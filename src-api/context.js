global.players = []
global.teams = []
global.playersOnDeck = []
global.availablePlayers = []
global.currentGame = null

export const context = ({ req }) => ({
    players: global.players,
    teams: global.teams,
    currentPlayer: global.players.find(p => p.token === req.headers.authorization),
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers,
    currentGame: global.currentGame
})