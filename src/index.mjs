import puppeteer from 'puppeteer';
import * as R from 'ramda';
import * as utils from './utils';

export default async function main({ url, debug, hooks, helpers }) {
    const options = debug ? { headless: false, devtools: true} : {};
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    utils.mockNatives(page);

    const client = await page.target().createCDPSession();
    await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: (4 * 1024 * 1024) / 8,
        uploadThroughput: (3 * 1024 * 1024) / 8,
        latency: 20
    });

    page.on('pageerror', error => {
        helpers.log('error', error.toString());
        return void browser.close();
    });

    await hooks.create(page);
    await page.goto(url);

    for (const _ of R.range(0, 5000)) {
        await utils.runBehaviour({ page, helpers });
    }

    await browser.close();
    await hooks.destroy(page);
}
