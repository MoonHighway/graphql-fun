import React from 'react'
import { ExitButton } from './ExitButton'
import styled from 'styled-components'

export const Team = ({ avatar, color, players, onLeave=f=>f }) => (
    <Container color={color.name} textColor={color.text}>
        <figure>
            <img src={avatar} width={48} height={48} alt="" />
        </figure>
        <h1>
            <span>Team: {color.name}</span>
        </h1>
        <div className="teammates">
            {players.map((p, i) =>
                <img src={p.avatar} width={48} height={48} alt="" key={i} />
            )}
        </div>
        <ExitButton onClick={onLeave} color={color.text} />    
    </Container>
)

const Container = styled.div`
    background-color: ${props => props.color};
    align-self: stretch;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    figure {
        flex-grow: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 60%;
            height: 60%;
            border-radius: 50%;
        }
    }

    h1 {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        text-align: center;
        color: ${props => props.textColor};
        font-size: 2.75em;
        font-family: ${props => props.theme.fonts.creativeLight};
    }

    div.teammates {
        align-self: stretch;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        img {
            border-radius: 50%;
            margin: 1%;
        }
    }
    
`
