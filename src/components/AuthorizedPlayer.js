import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { GithubLoginButton } from '../ui'

const GITHUB_AUTHORIZATION = gql`
    mutation githubAuth($code: String!) {
        githubAuthorization(code: $code) {
            token
            player {
                login
                avatar
            }
        }
    }
`

class AuthorizedPlayer extends Component {
    render() {
        return <GithubLoginButton />
    }
}

export default AuthorizedPlayer