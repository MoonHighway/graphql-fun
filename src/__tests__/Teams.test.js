import { ApolloServer, PubSub } from 'apollo-server'
import { readFileSync } from 'fs'
import resolvers from '../../src-api/resolvers'
import { request } from 'graphql-request'
import players from './data/test-users.json'
import teams from './data/test-teams.json'

describe("Teams", () => {

    let server
    const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

    beforeAll(() => {
        const context = { players, teams, pubsub: new PubSub() }
        server = new ApolloServer({ typeDefs, resolvers, context })
        server.listen(3285)
    })

    afterAll(() => {
        server.stop()
    })

    it("breaks down players into groups", async () => {
        let response = await request('http://localhost:3285', `
            mutation {
                createTeams(count: 3) {
                    color
                    players {
                        login
                    }
                }
            }
        `)

        let expectedResponse = {
            createTeams: [
                {
                    color: expect.any(String),
                    players: expect.any(Array)
                },
                {
                    color: expect.any(String),
                    players: expect.any(Array)
                },
                {
                    color: expect.any(String),
                    players: expect.any(Array)
                }
            ]

        }
        expect(response).toEqual(expectedResponse)
    })

    it("destroys existing teams", async () => {
        let response = await request('http://localhost:3285', `
            mutation {
                destroyTeams
            }
        `)

        let expectedResponse = {
            destroyTeams: true
        }
        expect(response).toEqual(expectedResponse)
    })

    it("queries a single team by color", async () => {
        let response = await request('http://localhost:3285', `
            mutation {
                createTeams(count: 3) {
                    color
                }
            }
        `)

        let receivedColor = response.createTeams[0].color

        let teamResponse = await request('http://localhost:3285', `
            query {
                Team(color: "${receivedColor}") {
                    color
                }
            }
        `)

        let expectedResponse = {
            Team: {
                color: expect.any(String)
            }
        }
        expect(teamResponse).toEqual(expectedResponse)
    })

})
