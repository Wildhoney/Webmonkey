import chalk from 'chalk';
import * as utils from '../utils.mjs';

export default async function scroller({ page, log }) {
    const { height } = await page.evaluate(() => ({
        height: document.documentElement.scrollHeight - window.innerHeight,
        width: document.documentElement.scrollWidth - window.innerWidth
    }));

    const top = utils.randomBetween(0, height);
    const left = 0;

    await page.evaluate(
        ({ top, left }) =>
            window.scroll({
                top,
                left
            }),
        { top, left }
    );

    return void log(
        'scroller',
        `${chalk.whiteBright(top)}${chalk.gray('px')}`,
        chalk.gray('/'),
        `${chalk.whiteBright(left)}${chalk.gray('px')}`
    );
}
