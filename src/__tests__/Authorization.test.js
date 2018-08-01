import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import resolvers from '../../src-api/resolvers'
import { request } from 'graphql-request'

describe("Github Authorization", () => {

    let server
    const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

    beforeAll(async () => {
        server = new ApolloServer({ typeDefs, resolvers })
        server.listen(3000)
    })

    afterAll(async () => {
        server.stop()
    })

    // it("Github Authorization Mutation")

    // it("Logout Mutation")

    describe("me query", () => {

        it("returns the current player's name", async () => {
            const context = {
                currentPlayer: {
                    login: 'MoonTahoe',
                    avatar: 'http://avatar.com/moontahoe',
                    name: 'Alex Banks',
                }
            }
            server.context = context
            let { me } = await request('http://localhost:3000', `
                query { 
                    me { 
                        name 
                    } 
                }
            `)
            expect(me).toEqual({ name: 'Alex Banks' })               
        })

        it("returns null when there is not a current user", async () => {
            server.context = { currentPlayer: null }
            let { me } = await request('http://localhost:3000', `
                query { 
                    me { 
                        name 
                    } 
                }
            `)
            expect(me).toEqual(null)
        })

    })

})