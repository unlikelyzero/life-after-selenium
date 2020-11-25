# Life After Selenium
This repo is used in the Life After Selenium Presentation which compares `webdriverio`, `puppeteer`, `playwright`, `cypress` and `selenium`. It contains the code necessary to run the same test in four frameworks against [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app). 

# Getting Started
First, you'll need to get the demo application running. 

## Cypress Realworld App Install
The steps to do that are [here](https://github.com/cypress-io/cypress-realworld-app#getting-started). 

Verify that you see the app running on `http://localhost:3000/`

## UI Framework Comparison Install
1. Next, open another terminal.
2. Install the test frameworks with `npm install`
3. Pick your framework and run with `test` scripts in package.json. i.e. `npm run test:webdriverio:puppeteer`

## Add Latency to Cypress Real World App
1. Install [comcast](https://github.com/tylertreat/comcast)
2. comcast --device=eth0 --latency=100 --target-addr=0.0.0.0/24 --target-proto=tcp,udp,icmp --target-port=3000,3001

# Presentations
## Slide Decks
Latest: https://slides.com/unlikelyzero/life-after-selenium-07-08-20

Abbreviatied: https://slides.com/unlikelyzero/life-after-selenium-03810f
## Youtube Recording
https://youtu.be/89riVKOTyFY