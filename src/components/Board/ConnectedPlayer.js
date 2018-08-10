import React, { Component } from 'react'
import { random } from 'faker'
import styled from 'styled-components'


export class ConnectedPlayer extends Component {
    bounds = {
        height: window.innerHeight,
        width: window.innerWidth
    }
    constructor(props) {
        super()

        let top, left
        switch(Math.floor(Math.random()*8)) {
            case 0: 
                top = `${random.number({ min: 0, max: this.bounds.height * .25 })}px`
                left = `${random.number({ min: 0, max: this.bounds.width * .25 })}px`
                break
            case 1:
                top = `${random.number({ min: 0, max: this.bounds.height * .25 })}px`
                left = `${random.number({ min: this.bounds.width * .25, max: this.bounds.width * .75 })}px`
                break
            case 2: 
                top = `${random.number({ min: 0, max: this.bounds.height * .25 })}px`
                left = `${random.number({ min: (this.bounds.width * .75)-100, max: this.bounds.width-60 })}px`
                break
            case 3: 
                top = `${random.number({ min: this.bounds.height * .25, max: this.bounds.height * .75 })}px`
                left = `${random.number({ min: 0, max: this.bounds.width * .25 })}px`
                break  
            case 4: 
                top = `${random.number({ min: this.bounds.height * .25, max: this.bounds.height * .75 })}px`
                left = `${random.number({ min: (this.bounds.width * .75)-100, max: this.bounds.width-60 })}px`
                break       
            case 5: 
                top = `${random.number({ min: this.bounds.height * .75, max: this.bounds.height-60 })}px`
                left = `${random.number({ min: 0, max: this.bounds.width * .25 })}px`
                break  
            case 6: 
                top = `${random.number({ min: this.bounds.height * .75, max: this.bounds.height-60 })}px`
                left = `${random.number({ min: this.bounds.width * .25, max: this.bounds.width * .75 })}px`
                break
            default: 
                top = `${random.number({ min: this.bounds.height * .75, max: this.bounds.height-60 })}px`
                left = `${random.number({ min: (this.bounds.width * .75)-100, max: this.bounds.width-60 })}px`
                break          
        }

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