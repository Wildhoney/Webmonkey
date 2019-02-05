import puppeteer from 'puppeteer';
import delay from 'delay';
import * as R from 'ramda';
import * as utils from './utils';

export default async function main({ url, headless, hooks }) {
    const browser = await puppeteer.launch({ headless, devtools: true });
    const page = await browser.newPage();

    await hooks.create(page);
    await page.goto(url);

    await Promise.all(
        R.range(0, 1000).map(() => {
            utils.runBehaviour(page);
        })
    );

    await delay(25000);
    await browser.close();
    await hooks.destroy(page);
}
