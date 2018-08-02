import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import resolvers from '../../src-api/resolvers'
import { request } from 'graphql-request'
import { context } from '../../src-api/context'

describe("Price is Right", () => {

    let server
    const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

    beforeAll(() => {
        server = new ApolloServer({ typeDefs, resolvers, context })
        server.listen(3285)
    })

    afterAll(() => {
        server.stop()
    })

    it("brings person to the stage", async () => {
        let response = await request('http://localhost:3285', `
            mutation {
                comeOnDown {
                    login
                    avatar
                    name
                }
            }
        `)

        let expectedResponse = {
            comeOnDown: {
                login: expect.any(String),
                avatar: expect.any(String),
                name: expect.any(String)
            }


        }
        expect(response).toEqual(expectedResponse)
    })

    it("kicks last person out of the game", async () => {
        let response = await request('http://localhost:3285', `
            mutation {
                kickOut {
                    login
                }
            }
        `)

        let expectedResponse = {
            kickOut: {
                login: expect.any(String)
            }
        }
        expect(response).toEqual(expectedResponse)
    })

})
