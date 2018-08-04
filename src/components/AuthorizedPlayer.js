import React, { Component } from 'react'
import { GithubLoginButton } from '../ui'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { GITHUB_AUTHORIZATION, PLAYER_ROOT_QUERY } from './PlayerScreen'
import { storage } from '../client'

class AuthorizedPlayer extends Component {
    state = {
        signingIn: false
    }

    authorizationComplete = (cache, { data }) => {
        storage.setItem('token', data.githubAuthorization.token)
        cache.writeQuery({
            query: PLAYER_ROOT_QUERY,
            data: {
                me: data.githubAuthorization.player
            }
        })
        this.props.history.replace('/')
    }

    componentDidMount() {
        if (window.location.search.match(/code=/)) {
            this.setState({ signingIn: true })
            const code = window.location.search.replace("?code=", "")
            this.githubAuthorization({ variables: { code } })
        }
    }

    requestGithubCode = () => {
        this.setState({ signingIn: true })
        const clientID = process.env.REACT_APP_GITHUB_CLIENT_ID
        window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`
    }

    render() {
        return (
            <Mutation mutation={GITHUB_AUTHORIZATION} update={this.authorizationComplete}>
                {mutation => {
                    this.githubAuthorization = mutation
                    return <GithubLoginButton onClick={this.requestGithubCode} />
                }}
            </Mutation>
        )
    }
}

export default withRouter(AuthorizedPlayer)