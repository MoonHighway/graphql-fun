var {defineSupportCode} = require('cucumber')
var { startServer, stopServer } = require('./server')

defineSupportCode(function({Before, After}) {

    Before(function(result, cb) {
      startServer()
          .then(port => this.port = port)
          .then(() => cb())
          .catch(cb)
    })

    After(function() {
      stopServer()
    })
    
})
