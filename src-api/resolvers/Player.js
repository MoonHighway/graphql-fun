export const Player = {
    team: (root, args, { teams }) =>
        teams.find(team =>
            team.players.map(p => p.login).includes(root.login)),
    instrument: (root, args, { currentGame }) => {
        const musician = currentGame.players && currentGame.players.find(p => p.login === root.login)
        return musician ? musician.instrument : null
    }
}