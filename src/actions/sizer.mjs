import chalk from 'chalk';
import * as utils from '../utils.mjs';

export default async function sizer({ page, output }) {
    const height = utils.randomBetween(100, 2000);
    const width = utils.randomBetween(100, 2000);
    const scale = utils.randomBetween(1, 4);

    await page.setViewport({ height, width, deviceScaleFactor: scale });

    return void output(
        'sizer',
        `${chalk.whiteBright(height)}${chalk.gray('px')}`,
        chalk.gray('×'),
        `${chalk.whiteBright(width)}${chalk.gray('px')}`,
        chalk.gray(`(${chalk.whiteBright(scale)} dpr)`)
    );
}
