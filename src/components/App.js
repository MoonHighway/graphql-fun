import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { theme } from '../config.json'
import { client } from '../client'
import indieFlower from '../assets/IndieFlower.ttf'
import headFont from '../assets/Oswald-Bold.ttf'
import txtFont from '../assets/Oswald-Light.ttf'
import { Routes } from './Routes'

export const App = () => 
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    </ApolloProvider>

injectGlobal`
  @font-face {
    font-family: 'Indie Flower';
    font-style: normal;
    font-weight: 400;
    src: url(${indieFlower}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'HeadingFont';
    src: url(${headFont}) format('opentype');
  }
  @font-face {
    font-family: 'TextFont';
    src: url(${txtFont}) format('opentype');
  }
  html, 
  body, 
  #root {
        height: 100%;

  }
  body {
    display: flex;
    min-height: 100%;
    height: auto;
    padding: 0;
    margin: 0;
  }
  #root {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    height: auto;
  }
  h1, h2, h3, h4, p, td, span, div {
    padding: 0;
    margin: 0;
  }
`    