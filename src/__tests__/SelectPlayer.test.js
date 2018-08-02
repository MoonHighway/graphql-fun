import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import resolvers from '../../src-api/resolvers'
import { request } from 'graphql-request'
import players from './data/test-users.json'

describe("Price is Right", () => {

    let server
    const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

    beforeAll(() => {
        const context = () => ({
            players,
            playersOnDeck: [{ "login": "will", "avatar": "willb", "name": "Will Branson" }],
            availablePlayers: []
        })
        server = new ApolloServer({ typeDefs, resolvers, context })
        server.listen(3285)
    })

    afterAll(() => {
        server.stop()
    })

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
