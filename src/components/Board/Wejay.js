import React, { Fragment } from 'react'
import { Subscription } from 'react-apollo'
import { LISTEN_FOR_GAME_CHANGES } from '.'
import { Musician } from './Musician'
import { Audience } from './Audience'
import styled from 'styled-components'

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
                <Fragment>
                    {(data && data.gameChange.faces.length) ? 
                        <Audience faces={data.gameChange.faces} /> : 
                        null
                    }
                    {players.map(p => 
                        <Musician key={p.login} 
                            avatar={p.avatar}
                            login={p.login}
                            instrument={p.instrument} 
                            playingMusic={isPlayingMusic(data, p.instrument)}/>
                    )}
                </Fragment>
            }
        </Subscription>
    </Container>

const Container = styled.section`
    
    display: flex;
    flex-direction: row;

    h1:first-child {
        display: none;
    }

`    