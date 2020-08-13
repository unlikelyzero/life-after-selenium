const { remote } = require('webdriverio')

let browser;

(async () => {
    browser = await remote({
        automationProtocol: 'devtools',
        capabilities: {
            browserName: 'chrome'
        }
    })

    await browser.url('https://webdriver.io')

    /**
     * run Puppeteer code
    */
    await browser.call(async () => {
        const puppeteerBrowser = browser.getPuppeteer()
        const page = (await puppeteerBrowser.pages())[0]
        await page.setRequestInterception(true)
        page.on('request', interceptedRequest => {
            if (interceptedRequest.url().endsWith('webdriverio.png')) {
                return interceptedRequest.continue({
                    url: 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png'
                })
            }

            interceptedRequest.continue()
        })
    })
    

    // continue with WebDriver commands
    await browser.refresh()
    await browser.pause(2000)

    /**
     * now on the https://webdriver.io page you see the Puppeteer logo
     * instead of the WebdriverIO one
     */

    await browser.deleteSession()
})().catch(async (e) => {
    console.error(e)
    await browser.deleteSession()
})