import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs.graphql'
import resolvers from './resolvers'
import expressPlayground from 'graphql-playground-middleware-express'
import { context } from './context'

console.log('\n\nenvironment variables\n=================')
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('REACT_APP_GRAPHQL_ENDPOINT', process.env.REACT_APP_GRAPHQL_ENDPOINT)
console.log('REACT_APP_GRAPHQL_SUBSCRIPTIONS', process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS)
console.log('REACT_APP_GITHUB_CLIENT_ID', process.env.REACT_APP_GITHUB_CLIENT_ID)
console.log('GITHUB_CLIENT_SECRET', process.env.GITHUB_CLIENT_SECRET)
console.log('TEST_PLAYERS', process.env.REACT_APP_TEST_PLAYERS)
console.log('REACT_APP_MAX_CONNECTIONS', process.env.REACT_APP_MAX_CONNECTIONS)
console.log('REACT_APP_WEJAY_MAX_FACES', process.env.REACT_APP_WEJAY_MAX_FACES)
console.log('=================\n\n')

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})

server.applyMiddleware({ app, cors: true })
server.installSubscriptionHandlers(httpServer)

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
app.use('/', express.static('./build'))
app.use('/board', express.static('./build'))
app.use('/pick', express.static('./build'))

httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server ready at ${process.env.REACT_APP_GRAPHQL_ENDPOINT}`)
    console.log(`Subscriptions ready at ${process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS}`)
})
