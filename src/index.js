import React from 'react'
import { render } from 'react-dom'
import { PlayerScreen } from './components/Player'
import { injectGlobal, ThemeProvider } from 'styled-components'
import indieFlower from './assets/IndieFlower.ttf'
import headFont from './assets/Oswald-Bold.ttf'
import txtFont from './assets/Oswald-Light.ttf'
import { theme } from './config.json'
import { client } from './client'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'

console.log('\n\nenvironment variables\n=================')
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('REACT_APP_GRAPHQL_ENDPOINT', process.env.REACT_APP_GRAPHQL_ENDPOINT)
console.log('REACT_APP_GRAPHQL_SUBSCRIPTIONS', process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS)
console.log('REACT_APP_TEST_PLAYERS', process.env.REACT_APP_TEST_PLAYERS)
console.log('REACT_APP_GITHUB_CLIENT_ID', process.env.REACT_APP_GITHUB_CLIENT_ID)
console.log('REACT_APP_MAX_CONNECTIONS', process.env.REACT_APP_MAX_CONNECTIONS)
console.log('REACT_APP_WEJAY_MAX_FACES', process.env.REACT_APP_WEJAY_MAX_FACES)
console.log('=================\n\n')

render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <PlayerScreen />
      </ApolloProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

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
