const assert = require('assert');
const retry = require('async-retry');
const uglySearchCss = "div#root div.MuiListItemText-root.MuiListItemText-multiline > span"; //ugly css replacement


describe('Can find existing user in RWA', () => {
    
    before(async () => {
        await browser.setWindowSize(1440, 900);
        await browser.url('http://localhost:3000');
    });

    it('should navigate to Cypress Real World App', async () => {
        const pageTitle = await browser.getTitle();
        assert.equal(pageTitle, 'Cypress Real World App');
    });

    it('user can log in and navigate to new transaction page', async () => {
        
        (await $('#username')).click();
        await (await $('input[name="username"]')).waitForExist();
        await (await $('input[name="username"]')).setValue('Katharina_Bernier');
        await (await $('input[name="password"]')).setValue('s3cret');
        await (await $('button[type="submit"]')).click();
        
        //Better Waiting-until-true!
        await (await $('a[href="/transaction/new"]')).waitForExist();
        await (await $('a[href="/transaction/new"]')).click();
    });

    it.skip('can filter existing users for Devon Becker - Webdriver', async () => {
        await (await $('input[name="q"]')).waitForExist();
        await (await $('input[name="q"]')).setValue('Devon Becker');
        
        //'GET', 'http://localhost:3001/users/search?q=Devon+Becker'
        //Anti-pattern: Wait or Sleep
        await browser.pause(2000)

        assert.ok((await (await $(uglySearchCss)).getText()).includes('Devon Becker'));
    });

    it('can filter existing users for Devon Becker - Puppeteer', async () => {

        await (await $('input[name="q"]')).waitForExist();    
        await (await $('input[name="q"]')).setValue('Devon Becker');

        //XHR Network request to intercept
        await browser.setupInterceptor();
        await browser.expectRequest('GET', 'http://localhost:3001/users/search?q=Devon+Becker', 200);

        //Instead of sleeping, we're listening for the XHR network event
        let keepTrying;
        do {
            try {
                await browser.assertRequests();
                keepTrying = false;
            } catch {
                keepTrying = true;
            }
        } while (keepTrying)
        
        assert.ok((await (await $(uglySearchCss)).getText()).includes('Devon Becker'));
    });

});