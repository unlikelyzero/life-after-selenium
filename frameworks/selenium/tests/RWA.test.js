const { describe, it, after, before } = require('mocha');
const webPage = require('../utils/driverActions');
const assert = require('assert');
const {until, By} = require('selenium-webdriver');
const uglySearchCss = "div#root div.MuiListItemText-root.MuiListItemText-multiline > span"; //ugly css replacement



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

    it('should navigate to Cypress Real World App', async () => {
        const title = await driver. getTitle();
        assert.strictEqual(title, 'Cypress Real World App');
    });

    it('user can log in and navigate to new transaction page',async () => {

        console.log('This is the time between Browser launch and the Login Page appearing');

        //Selenium: Poll the browser continuously until true.
        // await driver.wait(
        //     until.elementLocated(By.css('input[name="username"]')), 
        //     10000
        // );

        (await webpage.findByCss('input[name="username"]')).sendKeys('Katharina_Bernier');
        (await webpage.findByCss('input[name="password"]')).sendKeys('s3cret');
        (await webpage.findByCss('button[type="submit"]')).click();
   
        console.log('This is the time between logging in and the Transaction page appearing');

        //Antipattern: Wait for some time.
        //await driver.sleep(2000);

        //Antipattern: Wait for an element to load to know that you've logged in
        //await webpage.findByCss('a[href="/transaction/new"]')
        
        //Selenium: Poll the browser continuously until true.
        await driver.wait(until.elementLocated(By.css('a[href="/transaction/new"]')), 2000);
        
        (await webpage.findByCss('a[href="/transaction/new"]')).click();
        //await driver.sleep(2000);
        console.log('New Transaction button appeared and was clicked');
    });

    
    it('can filter existing users for Devon Becker', async () => {        
        (await webpage.findByCss('input[name="q"]')).sendKeys('Devon Becker');
        console.log('Searchbar was found and Devon Becker typed in');
        
        //Missing XHR Request 'GET', 'http://localhost:3001/users/search?q=Devon+Becker'
        //Antipattern: Wait for some time.
        await driver.sleep(2000);
        
        assert.strictEqual(await (await webpage.findByCss(uglySearchCss)).getText(),'Devon Becker');
        console.log('Devon Becker returned in dropdown result');
    });    
});
