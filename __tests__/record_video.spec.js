const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const { expect } = require('@jest/globals');
const { attachment, ContentType } = require("allure-js-commons");

// const selenoid_url = 'https://user1:1234@selenoid.autotests.cloud'
const selenoid_url = 'http://192.168.1.11:4444'

const capabilities = {
    browserName: 'chrome',
    'selenoid:options': {
        enableVideo: true
    }
};

const getElementById = async (driver, id, timeout = 2000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};


async function attachVideo(sessionId) {
    const video_url = selenoid_url + "/video/" + sessionId + ".mp4"
    const html = "<html><body><video width='100%' height='100%' controls autoplay><source src='" +
           video_url + "' type='video/mp4'></video></body></html>";
    await attachment("This is a video", html, ContentType.HTML);
    await attachment("used url:", video_url, ContentType.TEXT);
};

describe(`webdriver`, () => {
    let driver;
    let sessionId;

    beforeAll(async () => {
            driver = new webdriver.Builder()
            .usingServer(
                selenoid_url + '/wd/hub'
            )
            .withCapabilities(capabilities)
            .build();
            
        await driver.getSession().then(function(session) {
            sessionId = session.id_;
        });
        // eslint-disable-next-line no-undef
    }, 30000);


    test('page opens', async () => {
        await driver.get(`https://en.wikipedia.org/wiki/Software_testing`);
        const title = await driver.getTitle();
        attachVideo(sessionId);
        expect(title).toMatch(/Software/);
    });

    afterAll(async () => {
        await driver.quit();
    }, 40000);

});
