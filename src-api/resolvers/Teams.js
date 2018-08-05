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
    createTeams: (root, { count }, { pubsub, currentPlayer }) => {
        let groups = breakIntoGroups(count, global.players)
        global.teams = [...Array(count)].map((_, i) => ({
            color: random(),
            players: groups[i]
        }))

        pubsub.publish('new-instructions')

        return global.teams
    },
    destroyTeams: (_, args, { pubsub, currentPlayer }) => {
        global.teams = []
        pubsub.publish('new-instructions')
        return true
    }
}

