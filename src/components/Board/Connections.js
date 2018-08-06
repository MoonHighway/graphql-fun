import React from 'react'
import { Query } from 'react-apollo'
import { ALL_PLAYERS } from '.'
import styled from 'styled-components'

export const Connections = () =>
    <div>
        <h1>GraphQL Fun!</h1>
        <h2>Use your phone to connect</h2>
        <h3>http://graphql.fun</h3>
        <Query query={ALL_PLAYERS} pollInterval={1000}>
            {({ data }) => !(data && data.allPlayers) ? null :
                data.allPlayers.map(p =>
                    <AvatarImg
                        key={p.login}
                        teamColor={p.team && p.team.color}
                        src={p.avatar}
                        alt={p.login} />
                )
            }
        </Query>
    </div>

const AvatarImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: solid 5px ${props => props.teamColor ? props.teamColor : props.theme.colors.primary};
`