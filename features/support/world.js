const puppeteer = require('puppeteer')
const { setWorldConstructor } = require('cucumber')
const { join } = require('path')
const { request } = require('graphql-request')
const { expect } = require('chai')

const path = join(__dirname, '..', '..', '.env.production.local')
require('dotenv').config({ path })

console.log(`

    CUCUMBER WORLD 
    ==============
    Environment Vars: ${path}
    endpoint: ${process.env.REACT_APP_GRAPHQL_ENDPOINT}
    subscriptions: ${process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS}

`)


function CustomWorld() {
    this.puppeteer = puppeteer
    this.request = request
    this.expect = expect
    this.endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT
    this.subscriptions = process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS
}

setWorldConstructor(CustomWorld)
