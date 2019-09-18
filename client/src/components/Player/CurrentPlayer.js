import React, { Component } from 'react'
import { storage } from '../../client'
import { PLAYER_ROOT_QUERY, LISTEN_FOR_INSTRUCTIONS, LOGOUT } from '.'
import { WaitingForInstructions } from './ui/WaitingForInstructions'
import { End } from './ui/End'
import { Team } from './Team'
import { Game } from './Game'

export class CurrentPlayer extends Component {

    logout = () => {
        this.props.client.mutate({ mutation: LOGOUT })
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

                console.log('new instructions: ', data.instructions.endEvent)

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
        const { avatar, name, login, team, playingGame, instrument, endEvent } = this.props

        return playingGame ?
            <Game instrument={instrument} /> :
            team ?
                <Team {...team}
                    avatar={avatar}
                    onLeave={this.logOut} /> :
                    endEvent ? 
                        <End /> :
                        <WaitingForInstructions
                            name={name || login}
                            avatar={avatar}
                            onLeave={this.logout} />
    }
}