import React from 'react'
import styled from 'styled-components'
import { FaTwitter } from 'react-icons/fa'

export const TwitterButton = ({ onClick=f=>f}) =>
    <Container onClick={() => window.location = 'https://twitter.com/eveporcello'}>
        <FaTwitter />
        <span>@eveporcello</span>
    </Container>

const Container = styled.div`
    border: solid 1px white;
    align-self: stretch;
    margin: .4em;
    padding: .4em;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: ${props => props.theme.fonts.creativeLight};
    font-size: 2.5em;
    span {
        padding-left: .4em;
    }
   
    
    
`