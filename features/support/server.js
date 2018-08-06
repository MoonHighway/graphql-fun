const { spawn } = require('child_process')
var server, httpEndpoint, wsEndpoint

const startServer = () =>
    new Promise((resolve, reject) => {
        server = spawn('yarn', ['start:test'])
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
        server.stdout.on('error', reject)
    })
    .then(d => d.toString())

const stopServer = () => {
  if (server) {
    server.stdin.pause()
    server.kill()
  }
}

module.exports = { startServer, stopServer }
