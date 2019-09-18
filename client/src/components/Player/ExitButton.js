import React from 'react'
import styled from 'styled-components'
import { MdExitToApp } from 'react-icons/md'

export const ExitButton = ({ onClick=f=>f, color='white'}) =>
    <Container onClick={onClick} color={color}>
        <MdExitToApp />
        <span>leave</span>
    </Container>

const Container = styled.div`
    border: solid 1px ${props => props.color};;
    align-self: stretch;
    margin: .4em;
    padding: .4em;
    color: ${props => props.color};
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