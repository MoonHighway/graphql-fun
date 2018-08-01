import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs.graphql'
import expressPlayground from 'graphql-playground-middleware-express'
import resolvers from './resolvers'

import { random } from 'html-colors'

console.log('\n\nenvironment variables\n=================')
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('REACT_APP_GRAPHQL_ENDPOINT', process.env.REACT_APP_GRAPHQL_ENDPOINT)
console.log('REACT_APP_GRAPHQL_SUBSCRIPTIONS', process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS)
console.log('REACT_APP_GITHUB_CLIENT_ID', process.env.REACT_APP_GITHUB_CLIENT_ID)
console.log('GITHUB_CLIENT_SECRET', process.env.GITHUB_CLIENT_SECRET)
console.log('REACT_APP_MAX_CONNECTIONS', process.env.REACT_APP_MAX_CONNECTIONS)
console.log('REACT_APP_WEJAY_MAX_FACES', process.env.REACT_APP_WEJAY_MAX_FACES)
console.log('=================\n\n')

const app = express()

global.players = []

global.teams = []

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        players: global.players,
        teams: global.teams,
        currentPlayer: global.players.find(p => p.token === req.headers.authorization)
    })
})

server.applyMiddleware({ app, cors: true })

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.use('/', express.static('./build'))

app.listen({ port: process.env.PORT || 3000 }, () =>
    console.log(`GraphQL Fun Running`))
