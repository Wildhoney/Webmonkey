import path from 'path';
import puppeteer from 'puppeteer';
import R from 'ramda';
import * as utils from './utils.mjs';

const queue = new Set();

const summary = new Map([
    ['errors', 0],
    ['warnings', 0],
]);

const templates = new Set();

export default async function main(config) {
    const options = config.debug ? { headless: false, devtools: true } : {};
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    page.on('pageerror', async (error) => {
        config.output.error(error.toString());
        queue.add(utils.takeScreenshot(page, config));
        summary.set('errors', summary.get('errors') + 1);
    });

    page.on('requestfinished', async (request) => {
        const response = request.response();
        if (!response) return;

        const status = response.status();
        const isValid = status >= 200 && status < 300;

        if (isValid) return;

        config.warnings &&
            config.output.warning(`${request.url()} failed with ${status}.`);

        queue.add(utils.takeScreenshot(page, config));
        summary.set('warnings', summary.get('warnings') + 1);
    });

    await config.hooks.create(page, config);
    await page.tracing.start({
        path: path.join(config.report, 'timeline.json'),
    });
    await page.goto(config.url);

    utils.silenceDialogs(page);
    utils.exposeFunctions(page);
    utils.emulateNetworkConditions(page);
    utils.handleDialogs(page);
    utils.preventNavigation(page);

    for (const current of R.range(0, config.iterations)) {
        const name = R.isNil(config.template)
            ? null
            : config.template[current].name;

        try {
            const action = await utils.runAction(
                name,
                {
                    page,
                    output: config.output.info(current + 1, config.iterations),
                    template: R.isNil(name)
                        ? {}
                        : config.template[current].meta,
                },
                config.strategy
            );

            templates.add(action);
            await Promise.all([...queue]);
        } catch (error) {
            config.output.error(error.toString());
            process.exitCode = 1;
            process.exit();
        }
    }

    await utils.writeTemplate(config, templates);
    await page.tracing.stop();
    await browser.close();
    await config.hooks.destroy(page, config);

    config.output.summary(config, summary);

    await Promise.all([...queue]);
    return summary.get('errors');
}
