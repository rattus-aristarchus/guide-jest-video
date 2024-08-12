/** @type {import('jest').Config} */
const config = {
    testEnvironment: "allure-jest/jsdom",
    setupFilesAfterEnv: [
        "./setup.js"
    ]
};

module.exports = config;
