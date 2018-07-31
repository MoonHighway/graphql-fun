//
//   TODO: Figure out Heroku Bug
//
//      [x] Get a simple server running on Heroku
//         * Replace the root index.js file with simple ApolloSerer code
//         * Does a simple "hello world" server have the same issue?
//          ** Note ** had to add env variable for development. Playground wont run w/out that
//      [ x ] Get a simplewebpack build server running on Heroku
//         * [ x] Move the code from the root index to this file
//         * [ x ] Replace the "require('module')" with "import"
//         * [ x ] Build the root index and run on Heroku
//         * Does a simple "hello world" server have the same issue?
//      [ x ] Import the typeDefs
//         * [ x ] Build the root index and run on Heroku
//         * Does a simple "hello world" server have the same issue?
//      [x ] Import the Resolvers
//         * [x ] Build the root index and run on Heroku
//         * Does a simple "hello world" server have the same issue?
//      [ x] Add Mocks
//         * [x ] Build the root index and run on Heroku
//         * Does a simple "hello world" server have the same issue?
//      [ ] Upgrade to apollo-server-express
//         * [ ] Build the root index and run on Heroku
//         * Does a simple "hello world" server have the same issue?
//      [ ] Serve the Static ./build folder
//         * [ ] Build the root index and run on Heroku
//         * Does a simple "hello world" server have the same issue?
//

// Insert Code Here...

//
// TODO: Start Here
//

import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs.graphql'
import resolvers from './resolvers'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true
})

server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }) => console.log(`Server running on ${url}`))


// import { ApolloServer } from 'apollo-server-express'
// import express from 'express'
// import typeDefs from './typeDefs.graphql'
// import expressPlayground from 'graphql-playground-middleware-express'
// import resolvers from './resolvers'

// const app = express()

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     mocks: true
// })

// server.applyMiddleware({ app, cors: true })

// app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

// app.use('/', express.static('./build'))

// app.listen({ port: process.env.PORT || 3000 }, () =>
//     console.log(`GraphQL Fun Running`))

