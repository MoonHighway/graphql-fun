//
// TODO: Start Here
//

const { ApolloServer } = require('apollo-server')

const typeDefs = `
    type Query {
        hello: String!
    }
`

const resolvers = {
    Query: {
        hello: () => "world"
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ PORT: process.env.PORT }).then(({ url }) => console.log(`Server running on ${url}`))