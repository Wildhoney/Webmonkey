import starwars from 'starwars';
import * as utils from '../utils.mjs';

export default async function typer({ page, helpers }) {
    try {
        await page.evaluate(async () => {
            const inputs = [...document.querySelectorAll('input')];
            const input =
                inputs[await window.randomBetween(0, inputs.length - 1)];
            const clear = window.fiftyFifty();
            input && clear && (input.value = '');
            input && input.focus();
        });

        const text = starwars();
        await page.keyboard.type(text, { delay: utils.randomBetween(0, 5) });

        const pressEnter = utils.fiftyFifty();
        pressEnter && (await page.keyboard.press('Enter'));

        return void helpers.log(
            'typer',
            pressEnter ? `Typed "${text}" followed by ENTER` : `Typed "${text}"`
        );
    } catch {}
}
