import React from 'react'
import styled from 'styled-components'
import logo from '../assets/graphql-logo.svg'
import { FaGithub } from 'react-icons/fa'
import { SyncLoader } from 'react-spinners'

export const GraphQLLogo = ({ width = "90%", margin = "0", children = "GraphQL Fun!!!" }) =>
    <CGraphQLLogo width={width} margin={margin}>
        <img src={logo} alt="GraphQL Fun" />
        <h1>{children}</h1>
    </CGraphQLLogo>

const CGraphQLLogo = styled.div`
    margin-top: ${props => props.margin}
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    img {
        width: ${props => props.width};
    }

    h1 {
        font-family: ${props => props.theme.fonts.fun};
        color: ${props => props.theme.colors.primary};
        font-size: 3em;
    }
`

export const GithubLoginButton = ({ onClick = f => f }) =>
    <CGithubLoginButton onClick={onClick}>
        <FaGithub /> Sign In with GitHub
    </CGithubLoginButton>

const CGithubLoginButton = styled.div`
    color: white;
    border: solid 1px white;
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2em;
    padding: .5em;
    svg {
        font-size: 1.3em;
        margin-right: 10px;
    }

`

export const LoadingScreen = () =>
    <CLoadingScreen>
        <SyncLoader size={25} loading={true} color="white" />
    </CLoadingScreen>

const CLoadingScreen = styled.div`
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    svg {
        color: ${props => props.theme.colors.primary};
    }
`

export const Whoops404 = () =>
    <h1>Not Found</h1>