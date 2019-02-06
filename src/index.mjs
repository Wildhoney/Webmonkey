import puppeteer from 'puppeteer';
import * as R from 'ramda';
import * as utils from './utils';

let errored = false;
let urls = new Set();

let isNavigation = false;

export default async function main({ url, debug, hooks, helpers }) {
    const options = debug ? { headless: false, devtools: true } : {};
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

    await hooks.create(page);
    await page.goto(url);

    await page.on('request', async request => {
        isNavigation = request.isNavigationRequest();
    });

    for (const _ of R.range(0, 5000)) {
        try {
            isNavigation &&
                (await page.waitForNavigation({
                    waitUntil: 'load',
                    timeout: 10000
                }));
        } catch {}
        !errored && (await utils.runBehaviour({ page, helpers }));
    }

    await browser.close();
    await hooks.destroy(page);
}
