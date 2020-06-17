
/* Import the puppeteer and expect functionality of chai library for configuraing the Puppeteer */
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const server = require('../index');

global.browser;
// var browser = browser || chrome;
/* create the global variable by using lodash function */
//const globalVariables = _.pick(global, ['browser', 'expect']);

/* configurable options or object for puppeteer */
const opts = {
    headless: false,
    slowMo: 0,
    timeout: 0,
    defaultViewport: null,
    args: ['--start-maximized', '--window-size=1920,1080'] 
}

/* call the before for puppeteer for execute this code before start testing */
before (async () => {
  //global.expect = expect;
  browser = await puppeteer.launch(opts);

});

/* call the function after puppeteer done testing */
after (() => {
  browser.close();
  // global.browser = globalVariables.browser;
  // global.expect = globalVariables.expect;
});
