const playwright = require('playwright');

(async () => {
  for (const browserType of ['chromium', 'firefox', 'webkit']) {
    const browser = await playwright[browserType].launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://developers.google.com/web/tools/puppeteer/', { waitUntil: 'networkidle' });
    await page.waitForSelector('.devsite-search-field')
    await page.click('.devsite-search-field')
    await page.keyboard.type('puppeteer')
    await page.keyboard.press('Enter')

    //const puppeteerText = await page.$eval('.devsite-search-term', el => el.value)
    //expect(puppeteerText).to.contain("Search results for puppeteer")

    await page.screenshot({ path: `./playwright/example-${browserType}.png` });
    await browser.close();
  }
})();