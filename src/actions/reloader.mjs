import chalk from 'chalk';
import marky from 'marky';
import numeral from 'numeral';
import * as utils from '../utils.mjs';

export default async function reloader({ page, output }) {
    try {
        await utils.allowNavigation(page);

        marky.mark('duration');
        await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
        const { duration } = marky.stop('duration');

        await utils.preventNavigation(page);

        output(
            'reloader',
            `${chalk.whiteBright(numeral(duration).format('0,0'))}${chalk.gray(
                'ms'
            )}`
        );
    } catch {}

    return { name: 'reloader', meta: {} };
}
