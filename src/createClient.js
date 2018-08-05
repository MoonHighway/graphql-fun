import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

