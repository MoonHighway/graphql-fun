import React from 'react'
import { GraphQLLogo } from '../ui'
import styled from 'styled-components'

const Welcome = () =>
    <Container>
        <GraphQLLogo />
    </Container>

const Container = styled.div`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: Arial;
`

export const PlayerScreen = () => <Welcome /> 