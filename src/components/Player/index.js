import React, { Component } from 'react'
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
        playingGame
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

export const PLAY_MUTATION = gql`
    mutation play { play }
`

export const PAUSE_MUTATION = gql`
    mutation pause { pause }
`

export const LISTEN_FOR_INSTRUCTIONS = gql`
    subscription instructions {
        instructions {
            ...PlayerFields
        }
    }
    ${PLAYER_FRAGMENT}
`

export class PlayerScreen extends Component {

    render() {
        return (
            <Query query={PLAYER_ROOT_QUERY} fetchPolicy="cache-first">
                {({ loading, data, client }) => {
                    this.me = data.me
                    this.client = client
                    return loading ?
                        <LoadingScreen /> :
                        !data.me ?
                            <Welcome /> :
                            <CurrentPlayer client={client} {...data.me} />
                }}
            </Query>
        )
    }
}




