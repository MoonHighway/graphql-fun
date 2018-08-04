process.env.REACT_APP_TEST_PLAYERS = "true"
import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import resolvers from '../../src-api/resolvers'
import { context } from '../../src-api/context'
import { GraphQLClient } from 'graphql-request'
import nodeFetch from 'node-fetch'
global.fetch = nodeFetch

describe("Github Authorization", () => {

    const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')
    let server, client, token, player

    beforeAll(() => {
        global.players = []
        server = new ApolloServer({ typeDefs, resolvers, context })
        server.listen(3285)
    })

    beforeEach(() => {
        client = new GraphQLClient('http://localhost:3285', {
            headers: {
                'Authorization': token
            }
        })
    })

    afterAll(() => {
        server.stop()
    })

    it("initially a 'me' query returns null", async () => {
        let { me } = await client.request(`query { me { name } }`)
        expect(me).toEqual(null)
    })

    it("when a `authorizeWithGithub` is successful", async () => {
        let { githubAuthorization } = await client.request(`
            mutation authorize {
                githubAuthorization(code: "") {
                    token
                    player {
                        login
                        avatar
                        name
                    }
                }
            }
        `)
        token = githubAuthorization.token
        player = githubAuthorization.player
        expect(token).toBeDefined()
        expect(player.name).toBeDefined()
    })

    it("then a 'me' query should return the authorized player", async () => {
        let { me } = await client.request(`
            query { 
                me { 
                    login
                    avatar
                    name 
                } 
            }
        `)
        expect(me).toEqual(player)
    })

})