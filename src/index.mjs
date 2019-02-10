import path from 'path';
import puppeteer from 'puppeteer';
import * as R from 'ramda';
import moment from 'moment';
import * as utils from './utils';

const queue = new Set();

export default async function main({
    url,
    debug,
    iterations,
    hooks,
    screenshots,
    helpers
}) {
    const options = debug ? { headless: false, devtools: true } : {};
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    utils.silenceDialogs(page);
    utils.exposeFunctions(page);
    utils.emulateNetworkConditions(page);
    utils.handleDialogs(page);

    page.on('pageerror', async error => {
        helpers.error(error.toString());
        queue.add(
            page.screenshot({
                path: path.resolve(
                    screenshots,
                    `webmonkey_error_${moment().format()}.png`
                )
            })
        );
    });

    await hooks.create(page);
    await page.goto(url);

    utils.preventNavigation(page);

    for (const current of R.range(0, iterations)) {
        const log = helpers.info(current + 1, iterations);
        await utils.runBehaviour({ page, log });
    }

    console.log(queue.size);
    await Promise.all([...queue]);

    await browser.close();
    await hooks.destroy(page);
}
