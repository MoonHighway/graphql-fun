import React from 'react'
import styled from 'styled-components'
import { GraphQLLogo } from '../ui'
import AuthorizedPlayer from './AuthorizedPlayer'

export const Welcome = () =>
    <Container>
        <GraphQLLogo />
        <AuthorizedPlayer />
    </Container>


const Container = styled.div`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: Arial;
`
