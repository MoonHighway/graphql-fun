import React, { Component } from 'react'
import { storage } from '../../client'
import { PLAYER_ROOT_QUERY, LISTEN_FOR_INSTRUCTIONS } from '.'
import { Team } from './Team'
import { Game } from './Game'
import { WaitingForInstructions } from './ui/WaitingForInstructions'

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
        const { avatar, name, login, team, playingGame, instrument } = this.props

        return playingGame ?
            <Game instrument={instrument} /> :
            team ? 
                <Team {...team} /> :
                <WaitingForInstructions 
                    name={name || login}
                    avatar={avatar} 
                    onLeave={this.logout} />
    }
}