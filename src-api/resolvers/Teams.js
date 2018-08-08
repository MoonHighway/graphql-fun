import { random } from 'html-colors'
import { breakIntoGroups } from '../lib'
import ColorManager from 'color'

export const Query = {
    allTeams: () => global.teams,
    Team: (root, { color }) =>
        global.teams.find(team =>
            team.players.map(p => p.color.name === color.name)
        )
}

export const Mutation = {
    createTeams: (root, { count }, { pubsub, currentPlayer }) => {
        let groups = breakIntoGroups(count, global.players)
        global.teams = [...Array(count)].map((_, i) => ({
            color: {
                name: random()
            },
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

export const Color = {
    name: ({ name }) => name,
    hex: ({ name }) => ColorManager(name).hex(),
    rgb: ({ name }) => ColorManager(name).rgb().negate().string(),
    negate: ({ name }) => ColorManager(name).rgb().negate().string(),
    text: ({ name }) => ColorManager(name).luminosity() > .7 ? 
        ColorManager(name).darken(.8) : 
        ColorManager(name).lighten(.8)
}
