const { spawn } = require('child_process')
var server, httpEndpoint, wsEndpoint

const startServer = () =>
    new Promise((resolve, reject) => {
        console.log('starting server')
        try {
          server = spawn('node', ['./index.js'])
        } catch (err) {
          console.log('error starting server')
          console.error(err)
        }
        
        server.stdout.on('data', d => {
          let status = d.toString()
          console.log('stdin data: ', d.toString())
          if (status.match(/Server ready at/)) {
            httpEndpoint = status.replace('Server read at', '').trim()
          } else if (status.match(/Subscriptions ready at/)) {
            wsEndpoint = status.replace('Subscriptions ready at', '').trim()
          }
          if (httpEndpoint && wsEndpoint) {
            console.log('server started', httpEndpoint, wsEndpoint )
            resolve({ httpEndpoint, wsEndpoint })
          }
        })

        server.stdout.on('error', (error) => {
          console.log('stdout error')
          console.error(error)
        })

        console.log('not sure')
    })

const stopServer = () => {
  if (server) {
    server.stdin.pause()
    server.kill()
  }
}

module.exports = { startServer, stopServer }
