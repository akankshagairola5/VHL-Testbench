const { expect } = require('chai');
const puppeteer = require('puppeteer');

const _ = require('lodash');

const opts = {
    headless: false,
    slowMo: 0,
    timeout: 0,
    defaultViewport: null,
    args: ['--start-maximized', '--window-size=1920,1080']
}

describe('Test for VHL testbench', async () => {
    let page;

    before(async () => {

        /* before hook for mocha testing */
        browser = await puppeteer.launch(opts);

        page = (await browser.pages())[0]
        //  page = await browser.newPage()
        await page.goto("https://lti-gateway-testing.s3.amazonaws.com/lti-client.html");
        await page.screenshot({ path: 'VHL1.png' });

        console.log("launched...")

        // await page.setViewport( { width: 1366, height: 657} );
    });

    after(async function() { /* after hook for mocah testing */


        await page.close();

        browser.close();
       
    });

    it('Launch VHL Testbench', async () => { /* simple test case */

        const input = await page.$('input[id="call_url"]');
        await input.click({ clickCount: 3 })
        await input.type("https://reader.vhlcentral.com/demo/student-edition/comproqa_seneros_1b");
        await page.screenshot({ path: 'VHL1.png' });

        const key = await page.$('input[id="secret"]');
        await key.click({ clickCount: 3 })
        await key.type("yr34r43ry");

        await page.click("button[onclick='calculateparams()']");
        await page.click('button[type="submit"]');
        await page.waitFor(5000);


    });

    it('Assert', async () => { /* simple test case */

        console.log(await page.evaluate(() => document.querySelector('#responseContainer').textContent.trim()));
        //	expect(await page.evaluate(() => document.querySelector('#responseContainer').textContent.trim())).to.eql('{"LAYOUT_OPTIONS":{"HIDE_JS_ERRORS":true,"NOHEADERFOOTER":false},"CONTEXT":{"STATICASSETS_CLOUDFRONT_BASEPATH":"https://reader-apps.vhlcentral.com/","ALLOW_BOOKLIST_DASHBOARD":false,"ENV":"prod","COMPRODLS_ORGID":"vhl1-prod","USER":{"USERID":"292832126","USERNAME":""},"ASSETS_BASE_PATH":"https://reader-content.vhlcentral.com/vhl1-prod/products/"},"PRODUCT":{"PRODUCTCLASS":"student-edition","COMPRODLS_PRODUCTCODE":"comproqa_seneros_1b","COMPRODLS_PRODUCTVERSION":"2"}}');
        await page.screenshot({ path: 'VHL.png' });

    });
});
