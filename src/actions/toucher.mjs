import chalk from 'chalk';
import addMarker from '../helpers/marker.mjs';
import * as utils from '../utils.mjs';

export default async function toucher({ page, log }) {
    const { height, width } = await utils.pageDimensions(page);
    const x = Math.round(Math.random() * height);
    const y = Math.round(Math.random() * width);

    await addMarker(page, 'green', x, y);
    await page.touchscreen.tap(x, y);

    return void log(
        'toucher',
        `${chalk.whiteBright(x)}${chalk.gray('px')}`,
        chalk.gray('/'),
        `${chalk.whiteBright(y)}${chalk.gray('px')}`
    );
}
