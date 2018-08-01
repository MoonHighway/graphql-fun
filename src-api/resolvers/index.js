import * as connections from './Connections'
import * as authorization from './Authorization'
import * as teams from './Teams'

export default {
    Query: {
        ...connections.Query,
        ...authorization.Query,
        ...teams.Query
    },
    Mutation: {
        ...teams.Mutation,
        ...authorization.Mutation
    },
    Player: {
        ...teams.Player
    }
}