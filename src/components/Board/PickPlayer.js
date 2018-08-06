import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

const PICK_PLAYER = gql`
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

const PlayerPicked = ({ pickPlayer }) => {
    return <div>
        <h1>{pickPlayer.player.login}</h1>
        <img src={pickPlayer.player.avatar} alt="" width={100} height={100} />
    </div >
}


export const PickPlayer = () => (
    <Mutation mutation={PICK_PLAYER}>
        {(mutation, { data }) => {
            return (
                <div>
                    {!data ? <h1>Come on Down</h1> : <PlayerPicked {...data} />}
                    <button onClick={mutation}>Pick Player</button>
                </div>
            )
        }
        }

    </Mutation >
)