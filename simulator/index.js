const puppeteer = require('puppeteer')
const argv = require('minimist')(process.argv.slice(2));

let totalConnections = 0
const url = argv.url || 'http://localhost:3000'
const users = parseInt(argv.users, 10) || 1
const headless = argv.headless === 'false' ? false : true
const browsers = argv.browsers || 1
const connectionsPerBrowser = Math.ceil(users/browsers)
const { join } = require('path')

const browserWindow = async () => {
    const browser = await puppeteer.launch({ 
        timeout: 30000000,
        headless
    })
    for (let i=0; i<connectionsPerBrowser; i++) {
        if (totalConnections < users) {
            let page = await browser.newPage()
            await page.goto(url)
            try {
                await page.click('[data-test="login"]')
            } catch (error) {
                console.log(`problem connecting user ${i}: ${error.message}`)
                await page.screenshot({ path: join(__dirname, 'snapshots', 'errors', `screenshot-${i}.png`) })
            } finally {
                process.stdout.clearLine()
                process.stdout.cursorTo(0)
                process.stdout.write(`        ${++totalConnections}/${users} connected`)
            }
        } 

        if (totalConnections >= users) {
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write('        press any key to exit')
        }

    }

    process.on('exit', () => {
        browser.close()
    })
}

for (let i=0; i<browsers; i++) {
    browserWindow()
}

process.stdin.on('data', () => process.exit())

console.log(`
    Connecting ${users} users... 
        to ${url}... 
        with ${browsers} browser windows..
        and ${connectionsPerBrowser} per window
        ${!headless ? 'and opening Google Chrome\n' : ''}`)