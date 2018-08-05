import React from 'react'
import { LoadingScreen } from '../ui'
import { Welcome } from './Welcome'
import { CurrentPlayer } from './CurrentPlayer'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const PLAYER_FRAGMENT = `
    fragment PlayerFields on Player {
        login
        avatar
        team {
            color
            players {
                avatar
                login
            }
        }
        instrument
    }
`

export const PLAYER_ROOT_QUERY = gql`
    query playerQuery { 
        me { ...PlayerFields }
    }
    ${PLAYER_FRAGMENT}
`

export const GITHUB_AUTHORIZATION = gql`
    mutation githubAuth($code: String!) {
        githubAuthorization(code: $code) {
            token
            player { ...PlayerFields }
        }
    }
    ${PLAYER_FRAGMENT}
`

export const PlayerScreen = () =>
    <Query query={PLAYER_ROOT_QUERY} fetchPolicy="cache-first">
        {({ loading, data, client }) =>
            loading
                ? <LoadingScreen />
                : data.me
                    ? <CurrentPlayer {...data.me} client={client} />
                    : <Welcome />
        }
    </Query>



