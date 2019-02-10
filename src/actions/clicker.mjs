import chalk from 'chalk';
import addMarker from '../helpers/marker.mjs';
import * as utils from '../utils.mjs';

export default async function clicker({ page, output }) {
    const { height, width } = await utils.pageDimensions(page);
    const x = Math.round(Math.random() * height);
    const y = Math.round(Math.random() * width);

    await addMarker(page, 'orange', x, y);
    await page.mouse.click(x, y);

    return void output(
        'clicker',
        `${chalk.whiteBright(x)}${chalk.gray('px')}`,
        chalk.gray('/'),
        `${chalk.whiteBright(y)}${chalk.gray('px')}`
    );
}
