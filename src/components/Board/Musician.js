import React from 'react'
import styled from 'styled-components'

export const Musician = ({avatar, login, instrument, playingMusic=false }) =>
    <Container playingMusic={playingMusic}>
        <img className="musician" src={avatar} alt={login} />
        <h2>{instrument}</h2>
    </Container>

const Container = styled.div`
    img {
        border-radius: 50%;
        border: solid 10px ${props => props.playingMusic ? props.theme.colors.contrast : props.theme.colors.primary}
    }
`    