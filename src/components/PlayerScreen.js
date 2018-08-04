import React from 'react'
import { GraphQLLogo, LoadingScreen } from '../ui'
import styled from 'styled-components'
import AuthorizedPlayer from './AuthorizedPlayer'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const PLAYER_FRAGMENT = `
    fragment PlayerFields on Player {
        login
        avatar
        team {
            color
            players {
                avatar
                login
            }
        }
        instrument
    }
`

export const PLAYER_ROOT_QUERY = gql`
    query playerQuery { 
        me { ...PlayerFields }
    }
    ${PLAYER_FRAGMENT}
`

export const GITHUB_AUTHORIZATION = gql`
    mutation githubAuth($code: String!) {
        githubAuthorization(code: $code) {
            token
            player { ...PlayerFields }
        }
    }
    ${PLAYER_FRAGMENT}
`

export const PlayerScreen = () =>
    <Query query={PLAYER_ROOT_QUERY} fetchPolicy="cache-first">
        {({ loading, data }) =>
            loading
                ? <LoadingScreen></LoadingScreen>
                : data.me
                    ? <CurrentUser {...data.me} />
                    : <Welcome />
        }
    </Query>

const Welcome = () =>
    <Container>
        <GraphQLLogo />
        <AuthorizedPlayer />
    </Container>

const CurrentUser = ({ name, avatar }) =>
    <div>
        <img src={avatar} width={48} height={48} alt="" />
        <h1>{name}</h1>
    </div>

const Container = styled.div`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: Arial;
`
