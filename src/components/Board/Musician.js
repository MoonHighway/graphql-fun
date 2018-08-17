import React from 'react'
import styled from 'styled-components'

export const Musician = ({avatar, login, instrument, playingMusic=false }) =>
    <Container playingMusic={playingMusic}>
        <img className="musician" src={avatar} alt={login} />
        <h2 className={playingMusic ? 'playing' : ''}>{instrument}</h2>
    </Container>

const Container = styled.div`
    img {
        border-radius: 50%;
        border: solid 10px ${props => props.playingMusic ? props.theme.colors.contrast : props.theme.colors.primary}
    }

    h2 {
       text-align: center;
       color: ${props => props.theme.colors.primary};
       font-family: ${props => props.theme.fonts.creative};
       font-size: 2em;

        &.playing {
            color: ${props => props.theme.colors.contrast};
            font-family: ${props => props.theme.fonts.fun};
        }
    }
`    