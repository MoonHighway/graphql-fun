import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Connections } from './Connections'
import { Wejay } from './Wejay'
import { LoadingScreen } from '../ui'
export * from './PickPlayer'

const CURRENT_GAME = gql`
    query game {
        currentGame {
            playerCount
            players {
                name
                instrument
            }
        }
    }
`

export const BoardScreen = () =>
    <Query query={CURRENT_GAME}>
        {({ loading, data }) => loading ?
            <LoadingScreen /> :
            data && data.currentGame.playerCount ?
                <Wejay /> :
                <Connections />
        }
    </Query>
