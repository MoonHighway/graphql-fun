# import { ApolloServer } from 'apollo-server'
# import { readFileSync } from 'fs'
# import resolvers from '../../src-api/resolvers'
# import { request } from 'graphql-request'
# import players from './data/test-users.json'
# import playersOnDeck from './data/test-ondeck.json'
# import currentPlayer from './data/test-current-player.json'

# describe.skip("Start and Stop Game", () => {

#     let server
#     const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

#     // beforeAll(async () => {
#     //     const context = () => ({
#     //         players,
#     //         playersOnDeck,
#     //         currentGame: {},
#     //         currentPlayer

#     //     })
#     //     server = new ApolloServer({ typeDefs, resolvers, context })
#     //     await server.listen(3285)
#     // })

#     // afterAll(async () => {
#     //     await server.stop()
#     // })

#     it("starts the game", async () => {

#         let response = await request('http://localhost:3285', `
#             mutation start {
#                 startGame {
#                     playerCount
#                     players {
#                         name
#                         instrument
#                     }
#                 }
#             }
#         `)

#         let expectedResponse = {
#             startGame: {
#                 playerCount: 5,
#                 players: [
#                     {
#                         name: expect.any(String),
#                         instrument: "BASS"
#                     },
#                     {
#                         name: expect.any(String),
#                         instrument: "DRUMS"
#                     },
#                     {
#                         name: expect.any(String),
#                         instrument: "PERCUSSION"
#                     },
#                     {
#                         name: expect.any(String),
#                         instrument: "SAMPLER"
#                     },
#                     {
#                         name: expect.any(String),
#                         instrument: "SYNTH"
#                     }
#                 ]
#             }

#         }
#         expect(response).toEqual(expectedResponse)
#     })

#     it("ends the game", async () => {

#         let response = await request('http://localhost:3285', `
#             mutation end {
#                 endGame
#             }
#         `)

#         let expectedResponse = {
#             endGame: true
#         }
#         expect(response).toEqual(expectedResponse)
#     })

# })
