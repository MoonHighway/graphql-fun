var { Before, After } = require('cucumber')
var { startServer, stopServer } = require('./server')

Before(function(_, done) {
    startServer()
        .then(() => done())
        .catch(done)
})

After(stopServer)