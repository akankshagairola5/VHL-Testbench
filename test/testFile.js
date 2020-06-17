const { expect } = require('chai');

describe('Test for VHL testbench', async  () => {
    let page;
    
    before(async () => { /* before hook for mocha testing */
    	
 		page = await browser.newPage()
        await page.goto("https://lti-gateway-testing.s3.amazonaws.com/lti-client.html");
       // await page.setViewport( { width: 1366, height: 657} );
    });

    after(async function () { /* after hook for mocah testing */

       await page.close();
    });

    it('Launch VHL Testbench', async () => { /* simple test case */

    	const input = await page.$('input[id="call_url"]');
		await input.click({ clickCount: 3 })
		await input.type("https://reader.vhlcentral.com/demo/student-edition/comproqa_seneros_1b");

		const key = await page.$('input[id="secret"]');
		await key.click({ clickCount: 3 })
		await key.type("yr34r43ry");
    	
        await page.click("button[onclick='calculateparams()']");
        await page.click('button[type="submit"]');
        await page.waitFor(5000);
        await page.screenshot({ path: 'VHL.png' });

       

    });
});
