import React, { Fragment, Component } from 'react'
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

const START_GAME = gql`
    mutation start {
        startGame {
            playerCount
        }
    }
`

const PlayerPicked = ({ pickPlayer }) => {
    return <div>
        <h1>{pickPlayer.player.login}</h1>
        <img src={pickPlayer.player.avatar} alt="" width={100} height={100} />
    </div >
}


const maxPlayers = count => 5 - count

const StartGame = () => (
    <Mutation mutation={START_GAME}>
        {startGame => {
            return (
                <button onClick={startGame}>START GAME!</button>
            )
        }}
    </Mutation>
)

export class PickPlayer extends Component {

    onStart = async (startGame) => {
        await startGame()
        this.props.history.replace('/board')
    }

    render() {
        return (
            <Mutation mutation={PICK_PLAYER}>
                {(mutation, { data }) => {
                    return (
                        <div>
                            {!data ?
                                <Fragment>
                                    <h1>Come on Down</h1>
                                    <button onClick={mutation}>Pick Player</button>
                                </Fragment> :
                                data.pickPlayer.count === 5 ?
                                    <StartGame /> :
                                    <Fragment>
                                        <PlayerPicked {...data} />
                                        <p>Pick {maxPlayers(data.pickPlayer.count)} more players</p>
                                        <button onClick={mutation}>Pick Player</button>
                                    </Fragment>
                            }
                        </div>
                    )
                }
                }
            </Mutation >
        )
    }
}
