import React, { Component } from 'react'
import { Subscription } from 'react-apollo'
import { LISTEN_FOR_GAME_CHANGES } from '.'
import { Musician } from './Musician'
import { Audience } from './Audience'
import { loadAllAudio } from '../../lib.js'
import styled from 'styled-components'
import { LoadingScreen } from '../ui'

import bass from '../../assets/bass.mp3'
import drums from '../../assets/drums.mp3'
import percussion from '../../assets/percussion.mp3'
import sampler from '../../assets/sampler.mp3'
import synth from '../../assets/synth.mp3'

export class Wejay extends Component {

    state = { loadingMusic: true }
    
    async componentDidMount() {
        const files = [bass,drums,percussion,sampler,synth]
        const tracks = await loadAllAudio(files)
        tracks.forEach(track => {
            track.volume = 0
            track.loop = true
        })
        tracks.forEach(track => track.play())
        let [BASS,DRUMS,PERCUSSION,SAMPLER,SYNTH] = tracks
        this.tracks = {BASS,DRUMS,PERCUSSION,SAMPLER,SYNTH}
        this.setState({ loadingMusic: false })
    }

    componentWillUnmount = () => {
        Object.keys(this.tracks).forEach(instrument => this.tracks[instrument].src = '')
    }

    instruments = data => 
        data.gameChange.playingMusic.map(({ instrument }) => instrument)  

    isPlayingMusic = (data, instrument) => data && 
        -1 !== this.instruments(data).indexOf(instrument)
    
    playTrack = data => {
        if (data) {
            this.playSound(this.instruments(data))    
        }
    }

    playSound = instruments => 
        Object.keys(this.tracks).forEach(key => 
            this.tracks[key].volume = instruments.indexOf(key) !== -1 ? 1 : 0
        )

    render() {
        const { players } = this.props
        const { loadingMusic } = this.state
        return loadingMusic ?
            <LoadingScreen /> :
            <Subscription subscription={LISTEN_FOR_GAME_CHANGES}>
                {({ data }) => {
                    this.playTrack(data)
                    return (
                        <Container>
                            {(data && data.gameChange.faces.length) ? 
                                <Audience faces={data.gameChange.faces} /> : 
                                null
                            }
                            {players.map(p => 
                                <Musician key={p.login} 
                                    avatar={p.avatar}
                                    login={p.login}
                                    instrument={p.instrument} 
                                    playingMusic={this.isPlayingMusic(data, p.instrument)}/>
                            )}
                        </Container>
                    )
                }}
            </Subscription>
    }

}
    
const Container = styled.section`
    
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    text-align: center;
    
    h1:first-child {
        display: none;
    }

`    