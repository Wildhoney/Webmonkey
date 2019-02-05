import puppeteer from 'puppeteer';
import * as R from 'ramda';
import * as utils from './utils';

export default async function main({ url, headless, hooks, helpers }) {
    const browser = await puppeteer.launch({ headless, devtools: true });
    const page = await browser.newPage();

    await hooks.create(page);
    await page.goto(url);

    page.on('pageerror', error => {
        helpers.log('error', error.toString());
        return void browser.close();
    });

    utils.mockNatives(page);

    for (const _ of R.range(0, 5000)) {
        await utils.runBehaviour({ page, helpers });
    }

    await browser.close();
    await hooks.destroy(page);
}
