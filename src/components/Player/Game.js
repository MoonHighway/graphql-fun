import React from 'react'

const Musician = ({ instrument }) => (
    <div>
        <h2>{instrument}</h2>
        <div>Music Button</div>
    </div>
)

const Audience = () => (
    <div>Audience Button</div>
)

export const Game = ({ instrument }) => {
    return instrument ? <Musician instrument={instrument} /> : <Audience />
}
