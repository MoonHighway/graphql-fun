import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Connections } from './Connections'
import { Wejay } from './Wejay'
import { LoadingScreen } from '../ui'
export * from './PickPlayer'

export const ALL_PLAYERS = gql`
    query allPlayers {
        allPlayers {
            avatar
            team {
            color
            }
        }
    }
`

export const CURRENT_GAME = gql`
    query game {
        currentGame {
            playerCount
            playingMusic {
                instrument
            }
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
                avatar 
            }
        }
    }
`

export const PICK_PLAYER = gql`
    mutation pickPlayer {
        pickPlayer {
            count
            player {
                login
                avatar
            }
        }
    }
`

export const START_GAME = gql`
    mutation start {
        startGame {
            playerCount
        }
    }
`

export const BoardScreen = () =>
    <Query query={CURRENT_GAME}>
        {({ loading, data, client }) => loading ?
            <LoadingScreen /> :
            data && data.currentGame.playerCount ?
                <Wejay client={client}
                    players={data.currentGame.players}
                    playingMusic={data.currentGame.playingMusic} /> :
                <Connections />
        }
    </Query>
