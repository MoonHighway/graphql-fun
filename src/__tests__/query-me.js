// import { ApolloServer } from 'apollo-server'
// import { readFileSync } from 'fs'
// import resolvers from '../../src-api/resolvers'
// import { request } from 'graphql-request'

// describe("Application Queries", () => {

//     let server

//     beforeAll(() => {
//         const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')
//         server = new ApolloServer({ typeDefs, resolvers })
//         server.listen(3000)
//     })

//     afterAll(() => {
//         server.stop()
//     })

//     describe("Me Query", async () => {
//         it("returns null when there is not a current user", async () => {
//             let { me } = await request('http://localhost:3000', `
//                 query { 
//                     me { 
//                         name 
//                     } 
//                 }
//             `)

//             expect(me).toEqual(null)
//         })
//     })

// })