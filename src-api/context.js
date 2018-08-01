global.players = []
global.teams = []

export const context = ({ req }) => ({
    players: global.players,
    teams: global.teams,
    currentPlayer: global.players.find(p => p.token === req.headers.authorization)
})