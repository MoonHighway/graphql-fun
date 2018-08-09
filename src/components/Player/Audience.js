import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { PLAY_MUTATION } from '.'
import grayButton from '../../assets/gray_btn.svg'
import redButton from '../../assets/red_btn.svg'
import styled from 'styled-components'

export class Audience extends Component {
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
                        <div onClick={!selected && mutation} />
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
        background-image: url(${props => props.selected ? redButton : grayButton});
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
        }
    }

`