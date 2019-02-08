import delay from 'delay';
import * as utils from '../utils.mjs';

export default async function scroller({ page, helpers }) {
    const { height, width } = await page.evaluate(() => ({
        height: document.documentElement.scrollHeight,
        width: document.documentElement.scrollWidth
    }));

    const top = utils.randomBetween(0, height);
    const left = utils.randomBetween(0, width);

    await page.evaluate(
        ({ top, left }) =>
            window.scroll({
                top,
                left,
                behavior: 'smooth'
            }),
        { top, left }
    );

    await delay(1000);

    return void helpers.log('scroller', `Scrolled to ${top}, ${left}`);
}
