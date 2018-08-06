import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { PICK_PLAYER, START_GAME } from '.'

export class PickPlayer extends Component {

    comeOnDown = mutation =>
        <div>
            <h1>Come on Down</h1>
            <button onClick={mutation}>Pick Player</button>
        </div>

    maxPlayers = count => 5 - count

    playerPicked = (data, mutation) =>
        <div>
            <h1>{data.pickPlayer.player.login}</h1>
            <img src={data.pickPlayer.player.avatar} alt="" width={100} height={100} />
            <p>Pick {this.maxPlayers(data.pickPlayer.count)} more players</p>
            <button onClick={mutation}>Pick Player</button>
        </div >

    startGame = () =>
        <Mutation mutation={START_GAME} update={this.onGameStart}>
            {startGame => {
                return (
                    <button onClick={startGame}>START GAME!</button>
                )
            }}
        </Mutation>

    onGameStart = () => {
        this.props.history.replace('/board')
    }

    render() {
        return (
            <Mutation mutation={PICK_PLAYER}>
                {(mutation, { data }) => {
                    return !data ?
                        this.comeOnDown(mutation) :
                        data.pickPlayer.count === 5 ?
                            this.startGame() :
                            this.playerPicked(data, mutation)
                }
                }
            </Mutation >
        )
    }
}
