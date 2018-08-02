global.players = [
    { "login": "bill", "avatar": "billb", "name": "Bill Branson" },
    { "login": "jill", "avatar": "jillb", "name": "Jill Branson" },
    { "login": "will", "avatar": "willb", "name": "Will Branson" }
]
global.teams = []
global.playersOnDeck = []

export const context = ({ req }) => ({
    players: global.players,
    teams: global.teams,
    currentPlayer: global.players.find(p => p.token === req.headers.authorization),
    playersOnDeck: global.playersOnDeck
})