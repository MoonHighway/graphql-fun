import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import resolvers from '../../src-api/resolvers'
import { request } from 'graphql-request'
import players from './data/test-users.json'

describe.skip("Price is Right", () => {

    let server
    const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

    // beforeAll(async () => {

    //     global.players = players
    //     global.playersOnDeck = [{ "login": "will", "avatar": "willb", "name": "Will Branson" }]
    //     global.availablePlayers = []
    //     server = new ApolloServer({ typeDefs, resolvers })
    //     await server.listen(3285)
    // })

    // afterAll(async () => {
    //     await server.stop()
    // })

    it("brings person to the stage", async () => {

        let response = await request('http://localhost:3285', `
            mutation {
                pickPlayer {
                    count 
                    player {
                        name
                    }
                }
            }
        `)

        let expectedResponse = {
            pickPlayer: {
                count: expect.any(Number),
                player: {
                    name: expect.any(String)
                }
            }


        }
        expect(response).toEqual(expectedResponse)
    })

    it("kicks last person out of the game", async () => {
        let response = await request('http://localhost:3285', `
            mutation {
                putBackPlayer {
                    count
                    player {
                      name
                    }
                }
            }
        `)

        let expectedResponse = {
            putBackPlayer: {
                count: expect.any(Number),
                player: {
                    name: expect.any(String)
                }
            }
        }
        expect(response).toEqual(expectedResponse)
    })

})
