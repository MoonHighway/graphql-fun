global.players = []
global.teams = []
global.playersOnDeck = []
global.availablePlayers = []

export const context = ({ req }) => ({
    players: global.players,
    teams: global.teams,
    currentPlayer: global.players.find(p => p.token === req.headers.authorization),
    playersOnDeck: global.playersOnDeck,
    availablePlayers: global.availablePlayers
})