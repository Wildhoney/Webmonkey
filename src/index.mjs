import path from 'path';
import puppeteer from 'puppeteer';
import * as R from 'ramda';
import moment from 'moment';
import * as utils from './utils';

const queue = new Set();

export default async function main(config) {
    const options = config.debug ? { headless: false, devtools: true } : {};
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    page.on('pageerror', async error => {
        config.output.error(error.toString());
        queue.add(
            page.screenshot({
                path: path.join(
                    config.report,
                    'screenshots',
                    `${moment().format('HH:mm:ss')}.png`
                )
            })
        );
    });

    await config.hooks.create(page, config);
    await page.tracing.start({
        path: path.join(config.report, 'timeline.json')
    });
    await page.goto(config.url);

    utils.silenceDialogs(page);
    utils.exposeFunctions(page);
    utils.emulateNetworkConditions(page);
    utils.handleDialogs(page);
    utils.preventNavigation(page);

    for (const current of R.range(0, config.iterations)) {
        await utils.runAction({
            page,
            output: config.output.info(current + 1, config.iterations)
        });
        await Promise.all([...queue]);
    }

    await page.tracing.stop();
    await browser.close();
    await config.hooks.destroy(page, config);

    config.output.summary(config.iterations, queue.size);
    return queue.size;
}
