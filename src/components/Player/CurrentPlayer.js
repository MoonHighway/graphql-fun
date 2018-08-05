import React, { Component } from 'react'
import { MdExitToApp } from 'react-icons/md'
import { storage } from '../../client'
import { PLAYER_ROOT_QUERY } from '.'

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


