import React from 'react'
import { Query } from 'react-apollo'
import { ALL_PLAYERS } from '.'

export const Connections = () =>
    <div>
        <h1>GraphQL Fun!</h1>
        <Query query={ALL_PLAYERS} pollInterval={1000}>
            {({ loading, data }) => {
                if (loading) return "loading"
                return data.allPlayers.map(p => <img src={p.avatar} alt="" />)
            }}
        </Query>
    </div>