import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs.graphql'
import expressPlayground from 'graphql-playground-middleware-express'

const app = express()
const resolvers = {}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true
})

server.applyMiddleware({ app })

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
app.use('/', express.static('./build'))

app.listen({ port: process.env.PORT || 3000 }, () =>
    console.log(`GraphQL Fun Running`))

