import chalk from 'chalk';
import * as utils from '../utils.mjs';

export default async function sizer({ page, output, template }) {
    const height = template.height || utils.randomBetween(100, 2000);
    const width = template.width || utils.randomBetween(100, 2000);
    const scale = template.scale || utils.randomBetween(1, 4);

    try {
        await page.setViewport({ height, width, deviceScaleFactor: scale });

        output(
            'sizer',
            `${chalk.whiteBright(height)}${chalk.gray('px')}`,
            chalk.gray('×'),
            `${chalk.whiteBright(width)}${chalk.gray('px')}`,
            chalk.gray(`(${chalk.whiteBright(scale)} dpr)`)
        );
    } catch {}

    return { name: 'sizer', meta: { height, width, scale } };
}
