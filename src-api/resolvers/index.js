import * as connections from './Connections'
import * as authorization from './Authorization'
import * as teams from './Teams'
import * as selectPlayer from './SelectPlayer'
import * as game from './Game'
import { Player } from './Player'

export default {
    Query: {
        ...connections.Query,
        ...authorization.Query,
        ...teams.Query,
        ...game.Query
    },
    Mutation: {
        ...teams.Mutation,
        ...authorization.Mutation,
        ...selectPlayer.Mutation,
        ...game.Mutation
    },
    Subscription: {
        ...connections.Subscription,
        ...game.Subscription
    },
    Player
}