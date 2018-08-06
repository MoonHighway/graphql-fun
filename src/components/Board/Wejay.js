import React from 'react'
import styled from 'styled-components'

export const Wejay = ({ players }) => 
    <Container>
        <h1>Wejay Game</h1>
        {players.map(p => 
            <Player key={p.login} 
                avatar={p.avatar}
                login={p.login}
                instrument={p.instrument} />
        )}
    </Container>

const Player = ({avatar, login, instrument}) => 
    <div>
        <img src={avatar} alt={login} />
        <h2>{instrument}</h2>
    </div>

const Container = styled.section`
    
    display: flex;
    flex-direction: row;

    h1:first-child {
        display: none;
    }

    img {
        border-radius: 50%;
        border: solid 10px ${props => props.theme.colors.primary};
    }

`    