import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { PLAY_MUTATION, PAUSE_MUTATION } from '.'
import grayButton from '../../assets/gray_btn.svg'
import greenButton from '../../assets/green_btn.svg'
import styled from 'styled-components'

export class Musician extends Component {
    state = { selected: false }
    toggle = () => {
        this.setState(state => ({ selected: !state.selected }))
    }
    render() {
        const { instrument } = this.props
        const { selected } = this.state
        console.log('grey: ', grayButton)
        return (
            <Mutation mutation={selected ? PAUSE_MUTATION : PLAY_MUTATION} update={this.toggle}>
                {mutation => 
                    <Container selected={selected}>
                        <div onClick={mutation} />
                        <h2>{instrument}</h2>
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
    align-self: stretch;
    width: 100%;

    div {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url(${props => props.selected ? greenButton : grayButton});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        margin: 2em;
    }

    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4em;
        margin-top: .25em;
        margin-bottom: 1.25em;
        font-family: ${props => props.theme.fonts.fun};
        color: ${props => props.selected ?
            props.theme.colors.contrast : 
            props.theme.colors.primary
        };
        font-family: ${props => props.selected ?
            props.theme.fonts.fun : 
            props.theme.fonts.creative
        };
    }

`