const { When, Then } = require('cucumber')
const fetch = require('node-fetch')

let results

When('I send the following operation:', function async (query, done) {

    fetch('http://localhost:3000')
        .then(res => console.log('successful fetch'))
        .then(() => done())
        .catch(error => console.log('error: ', error.message))

    // this.request(this.endpoint, query)
    //     .then(r => results = r)
    //     .then(() => done())
    //     .catch(done)
})

Then('I should recieve the following data payload:', function (jsonString) {
    // let expected = JSON.parse(jsonString)
    // this.expect(results).to.deep.equal(expected)
})
