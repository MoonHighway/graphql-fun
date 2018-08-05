import React, { Component } from 'react'
import { MdExitToApp } from 'react-icons/md'
import { storage } from '../../client'
import { PLAYER_ROOT_QUERY, LISTEN_FOR_INSTRUCTIONS } from '.'

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

                console.log('instructions received: ', data)

                if (error) {
                    return console.error(error)
                }

                this.props.client.writeQuery({
                    query: PLAYER_ROOT_QUERY,
                    data: {
                        me: data.instructions
                    }
                })

                console.log('updated cache', this.props.client.cache)

            })
    }


    componentWillUnmount() {
        if (this.stopListeningToInstructions) {
            this.stopListeningToInstructions._cleanup()
        }
    }

    render() {
        const { avatar, login } = this.props
        return (
            <div>
                <img src={avatar} width={48} height={48} alt="" />
                <h1>{login}</h1>
                <span>leave </span>
                <MdExitToApp onClick={this.logOut} />
            </div>
        )
    }
}


