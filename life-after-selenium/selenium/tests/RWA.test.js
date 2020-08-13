const { describe, it, after, before } = require('mocha');
const webPage = require('../utils/driverActions');
const assert = require('assert');
const {until, By} = require('selenium-webdriver');


describe ('Can find existing user in RWA', async function () {
    let webpage, driver;

    before(async () => {
        webpage = new webPage();
        driver = webpage.driver;
        await webpage.visit('http://localhost:3000');
    });

    after(async () => {
        await webpage.quit();
    });

    it('should navigate to Cypress Web App', async () => {
        const title = await driver. getTitle();
        assert.equal(title, 'React App');
    });

    it('should let user login, navigate to new transaction page',async () => {

        await driver.wait(
            until.elementLocated(By.css('input[name="username"]')), 
            10000
        );
        (await webpage.findByCss('input[name="username"]')).sendKeys('Katharina_Bernier');
        (await webpage.findByCss('input[name="password"]')).sendKeys('s3cret');
        (await webpage.findByCss('button[type="submit"]')).click();
        
        //await driver.sleep(2000);

        await driver.wait(until.elementLocated(By.css('a[href="/transaction/new"]')), 1000);
        
        (await webpage.findByCss('a[href="/transaction/new"]')).click();
        //await driver.sleep(2000);
    });

    
    it('can filter existing users for Devon Becker', async () => {

        (await webpage.findByCss('input[name="q"]')).sendKeys('Devon Becker');
        await driver.sleep(2000);
        
        assert.equal(await (await webpage.findByCss('div#root div.MuiListItemText-root.MuiListItemText-multiline > span')).getText(),'Devon Becker');
    });    
});
