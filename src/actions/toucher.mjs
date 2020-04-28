import chalk from 'chalk';
import addMarker from '../helpers/marker.mjs';
import * as utils from '../utils.mjs';

export default async function toucher({ page, output, template }) {
    const { height, width } = await utils.pageDimensions(page);
    const x = template.x || Math.round(Math.random() * height);
    const y = template.y || Math.round(Math.random() * width);

    try {
        await addMarker(page, 'green', x, y);
        await page.touchscreen.tap(x, y);

        output(
            'toucher',
            `${chalk.whiteBright(x)}${chalk.gray('px')}`,
            chalk.gray('/'),
            `${chalk.whiteBright(y)}${chalk.gray('px')}`
        );
    } catch {}

    return { name: 'toucher', meta: { x, y } };
}
