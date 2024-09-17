const webdriver = require('selenium-webdriver');
const { expect } = require('@jest/globals');

const capabilities = {
    browserName: 'chrome',
    'selenoid:options': {
        enableVideo: true
    }
};

describe(`webdriver`, () => {
    let driver;

    beforeAll(async () => {
        driver = new webdriver.Builder()
                .usingServer(
                    global.selenoidURL + '/wd/hub'
                )
                .withCapabilities(capabilities)
                .build();
            
        await driver.getSession().then(function(session) {
            sessionId = session.id_;
            console.log("Session ID is " + sessionId);
        });
    }, 30000);


    it('page opens', async () => {
        await driver.get(`https://en.wikipedia.org/wiki/Software_testing`);
        const title = await driver.getTitle();
        expect(title).toMatch(/definitely not in the title/);
    });

    afterAll(async () => {
        await driver.quit();
    }, 40000);

});
