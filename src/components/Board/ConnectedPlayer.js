import React, { Component } from 'react'
import styled from 'styled-components'

export class ConnectedPlayer extends Component {
    bounds = {
        height: window.innerHeight - 100,
        width: window.innerWidth - 100
    }
    constructor(props) {
        super()

        let top = Math.floor(Math.random() * this.bounds.height * .25)
        if (Math.random() < .5) {
            top += (this.bounds.height * .75)
        } 

        let left = Math.floor(Math.random() * this.bounds.width * .25)
        if (Math.random() < .5) {
            left += (this.bounds.width * .75)
        } 

        top += 'px'
        left += 'px'

        this.state = { top, left }
    }
    render() {
        const { avatar, login, team } = this.props
        const { top, left } = this.state
        return (
            <Container teamColor={team && team.color.name} top={top} left={left}>
                <img src={avatar} alt={login} />
            </Container>
        )
    }
}    

const Container = styled.div`
    position: fixed;
    top: ${props => props.top};
    left: ${props => props.left};
    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: solid 5px ${props => props.teamColor ? props.teamColor : props.theme.colors.contrast};
    }
`