export const Player = {
    team: root =>
        global.teams.find(team =>
            team.players.map(p => p.login).includes(root.login)),
    instrument: (root, args, { currentGame }) => {
        const musician = currentGame.players && currentGame.players.find(p => p.login === root.login)
        return musician ? musician.instrument : null
    },
    playingGame: (root, args, { currentGame }) => currentGame.playerCount ? true : false
}