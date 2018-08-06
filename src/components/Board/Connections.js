import React from 'react'
import { Query } from 'react-apollo'
import { ALL_PLAYERS } from '.'
import styled from 'styled-components'

export const Connections = () =>
    <div>
        <h1>GraphQL Fun!</h1>
        <Query query={ALL_PLAYERS} pollInterval={1000}>
            {({ loading, data }) => {
                if (loading) return "loading"
                return data.allPlayers.map(
                    (p, i) => {
                        var color = !p.team ? "#E535AB" : p.team.color
                        return <AvatarImg style={{ borderColor: color }} src={p.avatar} alt={p.login} key={i} />
                    }
                )
            }}
        </Query>
    </div>

const AvatarImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: solid 5px;
`