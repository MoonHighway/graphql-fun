import React, { Component } from 'react'
import { Subscription } from 'react-apollo'
import { LISTEN_FOR_GAME_CHANGES } from '.'
import styled from 'styled-components'
import { LoadingScreen } from '../ui'

const isPlayingMusic = (data, instrument) => data && 
    -1 !== data.gameChange
        .playingMusic
        .map(x => x.instrument)
        .indexOf(instrument)

export const Wejay = ({ players }) => 
    <Container>
        <h1>Wejay Game</h1>
        <Subscription subscription={LISTEN_FOR_GAME_CHANGES}>
            {({ data }) => 
                players.map(p => 
                    <Player key={p.login} 
                        avatar={p.avatar}
                        login={p.login}
                        instrument={p.instrument} 
                        playingMusic={isPlayingMusic(data, p.instrument)}/>
                )
            }
        </Subscription>
    </Container>
    
const Player = ({avatar, login, instrument, playingMusic=false }) => 
    <Musician playingMusic={playingMusic}>
        <img src={avatar} alt={login} />
        <h2>{instrument}</h2>
    </Musician>

const Musician = styled.div`
    img {
        border-radius: 50%;
        border: solid 10px ${props => props.playingMusic ? props.theme.colors.contrast : props.theme.colors.primary}
    }
`

const Container = styled.section`
    
    display: flex;
    flex-direction: row;

    h1:first-child {
        display: none;
    }


`    