const { spawn } = require('child_process')
var server, httpEndpoint, wsEndpoint

const startServer = () =>
    new Promise((resolve, reject) => {
        console.log('starting server')
        server = spawn('node', ['./index.js'])
        server.stdout.on('data', d => {
          let status = d.toString()
          console.log('stdin data: ', d.toString())
          if (status.match(/Server ready at/)) {
            httpEndpoint = status.replace('Server read at', '').trim()
          } else if (status.match(/Subscriptions ready at/)) {
            wsEndpoint = status.replace('Subscriptions ready at', '').trim()
          }
          if (httpEndpoint && wsEndpoint) {
            console.log('server started')
            resolve({ httpEndpoint, wsEndpoint })
          }
        })
        server.stdout.on('error', (error) => {
          console.log('stdout error')
          console.error(error)
        })
    })
    .then(d => d.toString())

const stopServer = () => {
  if (server) {
    server.stdin.pause()
    server.kill()
  }
}

module.exports = { startServer, stopServer }
