const playwright = require('playwright');
const expect = require('expect-playwright');

(async () => {
  for (const browserType of ['chromium', 'firefox', 'webkit']) {
    const browser = await playwright[browserType].launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Note how
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

    await page.waitForSelector('css=[data-test="users-list"]')
    //await expect(page).toHaveText('div#root div.MuiListItemText-root.MuiListItemText-multiline > span', "Devon Becker")
    //await expect(page).toEqualValue('css=[data-test="users-list"]', "Devon Becker")
    //await expect(page).toHaveText("Devon Becker")

    await page.screenshot({ path: `./frameworks/playwright/RWA-${browserType}.png` });
    await browser.close();
  }
})();