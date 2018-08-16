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

window.printEnv = () => {
    console.log('\n\nenvironment variables\n=================')
    console.log('NODE_ENV', process.env.NODE_ENV)
    console.log('REACT_APP_GRAPHQL_ENDPOINT', process.env.REACT_APP_GRAPHQL_ENDPOINT)
    console.log('REACT_APP_GRAPHQL_SUBSCRIPTIONS', process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS)
    console.log('REACT_APP_TEST_PLAYERS', process.env.REACT_APP_TEST_PLAYERS)
    console.log('REACT_APP_GITHUB_CLIENT_ID', process.env.REACT_APP_GITHUB_CLIENT_ID)
    console.log('REACT_APP_MAX_CONNECTIONS', process.env.REACT_APP_MAX_CONNECTIONS)
    console.log('REACT_APP_WEJAY_MAX_FACES', process.env.REACT_APP_WEJAY_MAX_FACES)
    console.log('storageType: ', storageType)
    console.log('=================\n\n') 
    return storage.token
}

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
    uri: process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS,
    options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => ({
            Authorization: storage.token
        })
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