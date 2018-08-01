// import { ApolloServer } from 'apollo-server'
// import { readFileSync } from 'fs'
// import resolvers from '../../src-api/resolvers'
// import { request } from 'graphql-request'
// import players from './data/test-users.json'

// describe("Connections", () => {

//     let server
//     const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

//     beforeAll(() => {
//         const context = { players }
//         server = new ApolloServer({ typeDefs, resolvers, context })
//         server.listen(3000)
//     })

//     afterAll(() => {
//         server.stop()
//     })

//     it("returns the correct players", async () => {
//         let response = await request('http://localhost:3000', `
//             query {
//                 playerCount
//                 allPlayers {
//                   login
//               }
//             }
//         `)

//         let expectedResponse = {
//             playerCount: 3,
//             allPlayers: [
//                 { login: "bill" },
//                 { login: "jill" },
//                 { login: "will" }
//             ]
//         }

//         expect(response).toEqual(expectedResponse)
//     })

// })