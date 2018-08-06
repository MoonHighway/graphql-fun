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

export class PickPlayer extends Component {

    maxPlayers = count => 5 - count

    playerPicked = data => (
        <div>
            <h1>{data.pickPlayer.player.login}</h1>
            <img src={data.pickPlayer.player.avatar} alt="" width={100} height={100} />
        </div >
    )

    startGame = () => (
        <Mutation mutation={START_GAME} update={this.onGameStart}>
            {startGame => {
                return (
                    <button onClick={startGame}>START GAME!</button>
                )
            }}
        </Mutation>
    )

    onGameStart = () => {
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
                                    this.startGame() :
                                    <Fragment>
                                        {this.playerPicked(data)}
                                        <p>Pick {this.maxPlayers(data.pickPlayer.count)} more players</p>
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
