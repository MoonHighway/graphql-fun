import React from 'react'
import styled from 'styled-components'
import logo from './assets/graphql-logo.svg'

export const GraphQLLogo = ({ width = "60%", margin = "0", children = "GraphQL Fun!!!" }) =>
    <CGraphQLLogo width={width} margin={margin}>
        <img src={logo} alt="GraphQL Fun" />
        <h1>{children}</h1>
    </CGraphQLLogo>

const CGraphQLLogo = styled.div`
    margin-top: ${props => props.margin}
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    img {
        width: ${props => props.width};
    }

    h1 {
        font-family: ${props => props.theme.fonts.fun};
        color: ${props => props.theme.colors.primary};
        font-size: 2em;
    }
`