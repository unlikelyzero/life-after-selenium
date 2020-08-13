const playwright = require('playwright');
const expect = require('expect-playwright');

(async () => {
  for (const browserType of ['chromium', 'firefox', 'webkit']) {
    const browser = await playwright[browserType].launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForSelector('input[name="username"]')
    await page.click('input[name="username"]')
    await page.keyboard.type('Katharina_Bernier')

    await page.click('input[name="password"]')
    await page.keyboard.type('s3cret')

    await page.click('button[type="submit"]')

    await page.waitForSelector('a[href="/transaction/new"]')
    await page.click('a[href="/transaction/new"]')

    await page.waitForSelector('input[name="q"]')
    await page.click('input[name="q"]')
    await page.keyboard.type('Devon Becker')

    //await page.waitForSelector('div#root div.MuiListItemText-root.MuiListItemText-multiline > span')
    //await expect('div#root div.MuiListItemText-root.MuiListItemText-multiline > span').toHaveText("Devon Becker")

    await page.screenshot({ path: `./playwright/RWA-${browserType}.png` });
    await browser.close();
  }
})();