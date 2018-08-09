import React from 'react'
import { Query } from 'react-apollo'
import { ALL_PLAYERS } from '.'
import { ConnectedPlayer } from './ConnectedPlayer'
import background from '../../assets/bkgd.png'
import { FaMobileAlt } from 'react-icons/fa'
import styled from 'styled-components'

export const Connections = () =>
    <Query query={ALL_PLAYERS} pollInterval={1000}>
        {({ data }) => 
            <Container>
                {(data && data.allPlayers) ? 
                    data.allPlayers.map(p => <ConnectedPlayer key={p.login} {...p} />) :
                    null
                }
                <div className="instructions">
                    <FaMobileAlt />
                    <h1>GraphQL Fun!</h1>
                    <h3>http://graphql.fun</h3>
                    <h2>Use your phone to connect</h2>
                    {data.playerCount > 0 && <h4>{data.playerCount} players!</h4>}
                </div>
            </Container>
        }
    </Query>

const Container = styled.div`
    align-self: stretch;
    width: 100%;
    background-image: url(${background});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    div.instructions {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        svg {
            color: white;
            font-size: 18em;
        }
        h1 {
            color: white;
            font-family: ${props => props.theme.fonts.fun};
            font-size: 3em;
        }
        h2 {
            color: ${props => props.theme.colors.contrast};
            font-family: ${props => props.theme.fonts.creative};
            font-size: 3em;
        }
        h3 {
            color: white;
            font-size: 2.5em;
            font-family: ${props => props.theme.fonts.creative};
        }
        h4 {
            color: ${props => props.theme.colors.contrast};
            font-family: ${props => props.theme.fonts.fun};
            font-size: 3.5em;
        }
    }
`