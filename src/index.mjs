import path from 'path';
import puppeteer from 'puppeteer';
import R from 'ramda';
import moment from 'moment';
import * as utils from './utils.mjs';

const queue = new Set();

const templates = new Set();

export default async function main(config) {
    const { url, template, iterations } = await utils.readTemplate(config);

    const options = config.debug ? { headless: false, devtools: true } : {};
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    page.on('pageerror', async (error) => {
        config.output.error(error.toString());
        queue.add(
            page.screenshot({
                path: path.join(
                    config.report,
                    'screenshots',
                    `${moment().format('HH:mm:ss')}.png`
                ),
            })
        );
    });

    await config.hooks.create(page, config);
    await page.tracing.start({
        path: path.join(config.report, 'timeline.json'),
    });
    await page.goto(url);

    utils.silenceDialogs(page);
    utils.exposeFunctions(page);
    utils.emulateNetworkConditions(page);
    utils.handleDialogs(page);
    utils.preventNavigation(page);

    for (const current of R.range(0, iterations)) {
        const name = R.isNil(template) ? null : template[current].name;

        const action = await utils.runAction(name, {
            page,
            output: config.output.info(current + 1, config.iterations),
            template: R.isNil(name) ? {} : template[current].meta,
        });
        templates.add(action);
        await Promise.all([...queue]);
    }

    await utils.writeTemplate(config, templates);

    await page.tracing.stop();
    await browser.close();
    await config.hooks.destroy(page, config);

    config.output.summary(config, queue.size);
    return queue.size;
}
