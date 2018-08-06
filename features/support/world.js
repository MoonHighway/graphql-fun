require('chromedriver')
const puppeteer = require('puppeteer')
const { defineSupportCode } = require('cucumber')

function CustomWorld() {
    this.puppeteer = puppeteer
    this.endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT
    this.socket = process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})
