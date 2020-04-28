import chalk from 'chalk';
import marky from 'marky';
import numeral from 'numeral';
import * as utils from '../utils.mjs';

export default async function reloader({ page, output }) {
    marky.mark('duration');

    await utils.allowNavigation(page);
    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    await utils.preventNavigation(page);

    const { duration } = marky.stop('duration');

    return void output(
        'reloader',
        `${chalk.whiteBright(numeral(duration).format('0,0'))}${chalk.gray(
            'ms'
        )}`
    );
}
