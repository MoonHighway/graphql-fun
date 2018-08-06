Feature: Connections
    In order to understand who is connected
    the adminstrator should be able to query Connections
    so that they can group players and start games

    Scenario: Initial Players
        When I send the following operation:
        ```
        {
            playerCount
            allPlayers {
                name
            }
        }
        ```
        Then I should recieve the following data payload:
        ```
        {
            "playerCount": 0,
            "allPlayers": []
        }
        ```


# import { ApolloServer } from 'apollo-server'
# import { readFileSync } from 'fs'
# import resolvers from '../../src-api/resolvers'
# import { request } from 'graphql-request'
# import players from './data/test-users.json'

# describe.skip("Connections", () => {

#     let server
#     const typeDefs = readFileSync('./src-api/typeDefs.graphql', 'UTF-8')

#     // beforeAll(async () => {
#     //     const context = { players }
#     //     server = new ApolloServer({ typeDefs, resolvers, context })
#     //     await server.listen(3285)
#     // })

#     // afterAll(async () => {
#     //     await server.stop()
#     // })

#     it("returns the correct players", async () => {
#         let response = await request('http://localhost:3285', `
#             query {
#                 playerCount
#                 allPlayers {
#                   login
#               }
#             }
#         `)

#         let expectedResponse = {
#             playerCount: 3,
#             allPlayers: [
#                 { login: "bill" },
#                 { login: "jill" },
#                 { login: "will" }
#             ]
#         }

#         expect(response).toEqual(expectedResponse)
#     })

# })

