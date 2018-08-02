import * as connections from './Connections'
import * as authorization from './Authorization'
import * as teams from './Teams'
import * as priceIsRight from './PriceIsRight'

export default {
    Query: {
        ...connections.Query,
        ...authorization.Query,
        ...teams.Query
    },
    Mutation: {
        ...teams.Mutation,
        ...authorization.Mutation,
        ...priceIsRight.Mutation
    },
    Player: {
        ...teams.Player
    }
}