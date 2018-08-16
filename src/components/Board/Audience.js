import React, { Component } from 'react'
import { random } from 'faker'
import styled from 'styled-components'

export const Audience = ({ faces=[] }) => 
    <Container>
        {faces.map(({ avatar, login }) => 
            <AudienceFace key={login} avatar={avatar} login={login} />
        )}
    </Container>

class AudienceFace extends Component {
    state = {
        top: Math.random() > .5 ? 
            random.number({ min: 80, max: 200}) :
            random.number({ min: 400, max: (window.innerHeight-(window.innerHeight*.1))})
    }
    render() {
        const { login, avatar } = this.props
        const { top } = this.state
        return (
            <Face src={avatar} alt={login} top={top} />
        )
    }
}

const Face = styled.img`
    @keyframes floatBy {
        0%: { right: -80px; }
        100% { right: ${window.innerWidth + 100}px; }
    }
    @keyframes waggle {
        0% { margin-top: +100px }
        100% { margin-top: -100px }
    }
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: solid 5px ${props => props.color || props.theme.colors.primary};
    position: fixed;
    top: ${props => props.top}px;
    right: -80px;
    animation: floatBy 5s ease-in forwards, waggle 1s alternate infinite none running;
`

const Container = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    img {
        border-radius: 50%;
        border: solid 4px ${props => props.theme.colors.primary};
        height: 50px;
        width: 50px;
    }
`