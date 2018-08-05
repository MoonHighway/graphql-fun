import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'

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

export const client = new ApolloClient({
    cache,
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: operation => {
        operation.setContext(context => ({
            headers: {
                ...context.headers,
                Authorization: storage.getItem('token')
            }
        }))
    }
})