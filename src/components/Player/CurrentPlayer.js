import React, { Component, Fragment } from 'react'
import { MdExitToApp } from 'react-icons/md'
import { storage } from '../../client'
import { PLAYER_ROOT_QUERY, LISTEN_FOR_INSTRUCTIONS } from '.'
import { Team } from './Team'
import { Game } from './Game'

export class CurrentPlayer extends Component {

    logOut = () => {
        storage.removeItem('token')
        this.props.client.writeQuery({
            query: PLAYER_ROOT_QUERY,
            data: {
                me: null
            }
        })

    }

    componentDidMount() {
        this.stopListeningToInstructions = this.props.client
            .subscribe({ query: LISTEN_FOR_INSTRUCTIONS })
            .subscribe(({ data, error }) => {

                if (error) {
                    return console.error(error)
                }

                this.props.client.writeQuery({
                    query: PLAYER_ROOT_QUERY,
                    data: {
                        me: data.instructions
                    }
                })

            })
    }


    componentWillUnmount() {
        if (this.stopListeningToInstructions) {
            this.stopListeningToInstructions._cleanup()
        }
    }

    render() {
        const { avatar, login, team, playingGame, instrument } = this.props
        console.log(playingGame)

        return playingGame ?
            <Fragment>
                <Game instrument={instrument} />
                <MdExitToApp onClick={this.logOut} />
            </Fragment> :
            team ?
                <Fragment>
                    <Team {...team} />
                    <span>leave </span>
                    <MdExitToApp onClick={this.logOut} />
                </Fragment> :
                <div>
                    <img src={avatar} width={48} height={48} alt="" />
                    <h1>{login}</h1>
                    <span>leave </span>
                    <MdExitToApp onClick={this.logOut} />
                </div>
    }
}