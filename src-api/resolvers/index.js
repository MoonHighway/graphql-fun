import * as connections from './Connections'
import * as teams from './Teams'

export default {
    Query: {
        ...connections.Query,
        ...teams.Query
    },
    Mutation: {
        ...teams.Mutation
    },
    Player: {
        ...teams.Player
    }
}