import React from 'react'

export const Team = ({ color, players }) => (
    <div style={{ backgroundColor: color }}>
        <h1>{color}</h1>
        <ul>
            {players.map((p, i) =>
                <li key={i}>{p.login}</li>
            )}
        </ul>
    </div>
)
