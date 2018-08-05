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

export const LISTEN_FOR_INSTRUCTIONS = gql`
    subscription instructions {
        instructions {
            ...PlayerFields
        }
    }
    ${PLAYER_FRAGMENT}
`

export class PlayerScreen extends Component {

    componentDidMount() {
        this.stopListeningToInstructions = this.client
            .subscribe({ query: LISTEN_FOR_INSTRUCTIONS })
            .subscribe(({ data, error }) => {
                this.client.readQuery({
                    query: PLAYER_ROOT_QUERY
                })

                this.client.writeQuery({
                    query: PLAYER_ROOT_QUERY,
                    data: {
                        me: data.instructions
                    }
                })

            })

    }

    componentWillUnmount() {
        this.stopListeningToInstructions._cleanup()
    }

    render() {
        return (
            <Query query={PLAYER_ROOT_QUERY} fetchPolicy="cache-first">
                {({ loading, data, client }) => {
                    this.client = client
                    return loading
                        ? <LoadingScreen />
                        : data.me
                            ? <CurrentPlayer {...data.me} client={client} />
                            : <Welcome />
                }}
            </Query>
        )
    }
}




