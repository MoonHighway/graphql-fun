import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Connections } from './Connections'
import { Wejay } from './Wejay'
import { LoadingScreen } from '../ui'
export * from './PickPlayer'

export const CURRENT_GAME = gql`
    query game {
        currentGame {
            playerCount
            players {
                login
                name
                avatar
                instrument
            }
        }
    }
`

export const LISTEN_FOR_GAME_CHANGES = gql`
    subscription {
        gameChange {
            playingMusic {
                instrument
            }
            faces { 
                login 
            }
        }
    }
`

export const BoardScreen = () =>
    <Query query={CURRENT_GAME}>
        {({ loading, data, client }) => loading ?
            <LoadingScreen /> :
            data && data.currentGame.playerCount ?
                <Wejay players={data.currentGame.players} client={client} /> :
                <Connections />
        }
    </Query>
