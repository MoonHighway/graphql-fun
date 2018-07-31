const { ApolloServer } = require('apollo-server')

const typeDefs = `
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: () => "sup world"
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`running at ${url}`))