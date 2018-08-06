import React from 'react'
import styled from 'styled-components'

export const Audience = ({ faces=[] }) => 
    <Container>
        {faces.map(({ avatar, login }) => 
            <img src={avatar} alt={login} key={login} />
        )}
    </Container>

const Container = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    img {
        border-radius: 50%;
        border: solid 4px ${props => props.theme.colors.primary};
        height: 50px;
        width: 50px;
    }
`