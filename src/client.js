import {
    InMemoryCache,
    ApolloClient,
    ApolloLink,
    HttpLink,
    split
} from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const storageType = process.env.REACT_APP_TEST_PLAYERS === 'true' ?
    'sessionStorage' : 'localStorage'
export const storage = window[storageType]

const cache = new InMemoryCache()

//
// Skipping Cache persistance for now, is causing too many bugs
//
// persistCache({ cache, storage })

// if (storage['apollo-cache-persist']) {
//     let cacheData = JSON.parse(storage['apollo-cache-persist'])
//     cache.restore(cacheData)
// }

const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/subscriptions",
    options: {
        reconnect: true,
    }
})

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })
const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(context => ({
        headers: {
            ...context.headers,
            authorization: storage.getItem('token')
        }
    }))
    return forward(operation)
})

const httpAuthLink = authLink.concat(httpLink)

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpAuthLink
)


export const client = new ApolloClient({ cache, link })