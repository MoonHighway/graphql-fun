import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { PLAY_MUTATION, PAUSE_MUTATION } from '.'
import styled from 'styled-components'

export const Game = ({ instrument }) => instrument ? 
    <Musician instrument={instrument} /> : 
    <Audience />

class Musician extends Component {
    state = { selected: false }
    toggle = () => {
        this.setState(state => ({ selected: !state.selected }))
    }
    render() {
        const { instrument } = this.props
        const { selected } = this.state
        return (
            <Mutation mutation={selected ? PAUSE_MUTATION : PLAY_MUTATION} update={this.toggle}>
                {mutation => 
                    <Container selected={selected}>
                        <div onClick={mutation}>Music Button</div>
                        <h2>{instrument}</h2>
                    </Container>
                }
            </Mutation>
        )
    }
}   

class Audience extends Component {
    state = { selected: false }
    toggle = () => {
        this.setState({ selected: true })
    }
    render() {
        const { selected } = this.state
        return (
            <Mutation mutation={PLAY_MUTATION} update={this.toggle}>
                {mutation => 
                    <Container selected={selected}>
                        <div onClick={!selected && mutation}>Audience Button</div>
                    </Container>
                }
            </Mutation>
        )
    }
}

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    text-align: center;
    height: 200px;
    width: 200px;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        background-color: ${props => props.selected ? props.theme.colors.contrast : props.theme.colors.secondary};
        border-radius: 10px;
    }

`