import { random } from 'html-colors'
import { breakIntoGroups } from '../lib'

export const Query = {
    allTeams: () => global.teams,
    Team: (root, { color }) =>
        global.teams.find(team =>
            team.players.map(p => p.color === color)
        )
}

export const Mutation = {
    createTeams: (root, { count }) => {
        let groups = breakIntoGroups(count, global.players)
        global.teams = [...Array(count)].map((_, i) => ({
            color: random(),
            players: groups[i]
        }))
        return global.teams
    },
    destroyTeams: () => {
        global.teams = []
        return true
    }
}

export const Player = {
    team: root =>
        global.teams.find(team =>
            team.players.map(p => p.login).includes(root.login))
}