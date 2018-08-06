var { spawn } = require('child_process')
var path = require('path')
var server = null

const startServer = () =>
    new Promise((resolve, reject) => {
        server = spawn(path.join(__dirname, '..', '..'), ['yarn start'])
        server.stdout.on('data', d => {
          resolve(d)
        })
        server.stdout.on('error', reject)
    })
    .then(d => d.toString())

const stopServer = () => server && server.kill('SIGINT')

module.exports = { startServer, stopServer }
