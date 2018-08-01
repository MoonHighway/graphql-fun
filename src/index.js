import React from 'react'
import { render } from 'react-dom'

console.log('\n\nenvironment variables\n=================')
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('REACT_APP_GRAPHQL_ENDPOINT', process.env.REACT_APP_GRAPHQL_ENDPOINT)
console.log('REACT_APP_GRAPHQL_SUBSCRIPTIONS', process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS)
console.log('REACT_APP_GITHUB_CLIENT_ID', process.env.REACT_APP_GITHUB_CLIENT_ID)
console.log('REACT_APP_MAX_CONNECTIONS', process.env.REACT_APP_MAX_CONNECTIONS)
console.log('REACT_APP_WEJAY_MAX_FACES', process.env.REACT_APP_WEJAY_MAX_FACES)
console.log('=================\n\n')

render(<a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user`}>Get Github Code</a>, document.getElementById('root'))