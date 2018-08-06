const { spawn } = require('child_process')
var server, httpEndpoint, wsEndpoint

const startServer = () =>
    new Promise((resolve, reject) => {
        server = spawn('node', ['./index.js'])
        server.stdout.on('error', reject)
        server.stdout.on('data', d => {
          let status = d.toString()
          if (status.match(/Server ready at/)) {
            httpEndpoint = status.replace('Server read at', '').trim()
          } else if (status.match(/Subscriptions ready at/)) {
            wsEndpoint = status.replace('Subscriptions ready at', '').trim()
          }
          if (httpEndpoint && wsEndpoint) {
            resolve({ httpEndpoint, wsEndpoint })
          }
        })
    })

const stopServer = () => {
  if (server) {
    server.stdin.pause()
    server.kill()
  }
}

module.exports = { startServer, stopServer }
