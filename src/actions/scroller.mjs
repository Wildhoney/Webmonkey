import chalk from 'chalk';
import * as utils from '../utils.mjs';

export default async function scroller({ page, output, template }) {
    const { height } = await page.evaluate(() => ({
        height: document.documentElement.scrollHeight - window.innerHeight,
        width: document.documentElement.scrollWidth - window.innerWidth,
    }));

    const top = template.top || utils.randomBetween(0, height);
    const left = template.left || 0;

    try {
        await page.evaluate(
            ({ top, left }) => {
                const scroll =
                    typeof window.scroll === 'function'
                        ? window.scroll
                        : window.scrollTo;
                scroll({
                    top,
                    left,
                });
            },
            { top, left }
        );

        output(
            'scroller',
            `${chalk.whiteBright(top)}${chalk.gray('px')}`,
            chalk.gray('/'),
            `${chalk.whiteBright(left)}${chalk.gray('px')}`
        );
    } catch {}

    return { name: 'scroller', meta: { top, left } };
}
