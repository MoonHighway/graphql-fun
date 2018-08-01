import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import resolvers from '../../src-api/resolvers'
import { GraphQLClient } from 'graphql-request'

// 
// Authorization Steps
//
//   [ ] Program Authorization Before the Test
//   [ ] When env is development mock Github
//   [ ] When env is production use Github
//   [ ] Refactor, all working...
//   [ ] Now return to this test...
//

describe("Github Authorization", () => {

    const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')
    let server, client, token, player

    beforeAll(() => {
        server = new ApolloServer({ typeDefs, resolvers })
        server.listen(3285)
    })

    beforeEach(() => {
        client = new GraphQLClient('http://localhost:3285')
    })

    afterAll(() => {
        server.stop()
    })

    it("initially a 'me' query returns null", async () => {

        let { me } = await client.request(`query { me { name } }`)
        expect(me).toEqual(null)

    })

    it("when a `authorizeWithGithub` is successful")
    // it("when a `authorizeWithGithub` is successful", async() => {
    //     let results = await client.request(`
    //         mutation authorize($code:String!) {
    //             authorizeWithGithub(code: $code) {
    //                 token
    //                 player {
    //                     login
    //                     avatar
    //                     name
    //                 }
    //             }
    //         }
    //     `)
    //     token = results.token
    //     player = results.player
    //     expect(token).toBeDefined()
    //     expect(player.name).toBeDefined()
    // })

    it("then a 'me' query should return the authorized player")
    // it("then a 'me' query should return the authorized player", async () => {
    //     let { me } = await client.request(`
    //         query { 
    //             me { 
    //                 id
    //                 avatar
    //                 name 
    //             } 
    //         }
    //     `)
    //     expect(me).toEqual(player)
    // })

    it("when a 'logout' mutation is successful")
    // it("when a 'logout' mutation is successful", async () => {
    //     let result = await client.request(`
    //         mutation logout { 
    //             logout
    //         }
    //     `)
    //     expect(result).toEqual(true)
    // })

    it("then the 'me' query should return null")
    // it("then the 'me' query should return null", async () => {
    //     let { me } = await client.request(`
    //         query { 
    //             me { 
    //                 id
    //                 avatar
    //                 name 
    //             } 
    //         }
    //     `)
    //     expect(me).toEqual(null)
    // })

})