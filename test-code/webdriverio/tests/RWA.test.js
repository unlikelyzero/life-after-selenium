const assert = require('assert');
const retry = require('async-retry');

describe('Can find existing user in RWA', () => {
    
    before(async () => {
        //await browser.enablePerformanceAudits();
        await browser.setWindowSize(1440, 900);
        await browser.url('http://localhost:3000');
    });

    it('should navigate to Cypress Web App', async () => {
        const pageTitle = await browser.getTitle();
        assert.equal(pageTitle, 'React App');
    });

    it('should let user login, navigate to new transaction page', async () => {
        
        (await $('#username')).click();
        await (await $('input[name="username"]')).waitForExist();
        await (await $('input[name="username"]')).setValue('Katharina_Bernier');
        await (await $('input[name="password"]')).setValue('s3cret');
        await (await $('button[type="submit"]')).click();

        await (await $('a[href="/transaction/new"]')).waitForExist();
        await (await $('a[href="/transaction/new"]')).click();
    });

    it.skip('can filter existing users for Devon Becker - Selenium', async () => {
        await (await $('input[name="q"]')).waitForExist();
        await (await $('input[name="q"]')).setValue('Devon Becker');

        //await browser.pause(1000)

        assert.ok((await (await $('div#root div.MuiListItemText-root.MuiListItemText-multiline > span')).getText()).includes('Devon Becker'));
    });

    it('can filter existing users for Devon Becker - XHR intercept', async () => {
        await (await $('input[name="q"]')).waitForExist();

        //Intercept the request
        await browser.setupInterceptor();
        await browser.expectRequest('GET', 'http://localhost:3001/users/search?q=Devon+Becker', 200);
        await (await $('input[name="q"]')).setValue('Devon Becker');

        let keepTrying;

        do {
            try {
                await browser.assertRequests();
                keepTrying = false;
            } catch {
                keepTrying = true;
            }
        } while (keepTrying)
        
        assert.ok((await (await $('div#root div.MuiListItemText-root.MuiListItemText-multiline > span')).getText()).includes('Devon Becker'));
    });

});