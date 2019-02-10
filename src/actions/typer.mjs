import starwars from 'starwars';
import chalk from 'chalk';
import pluralise from 'pluralize';
import * as utils from '../utils.mjs';

export default async function typer({ page, output }) {
    try {
        await page.evaluate(async () => {
            const inputs = [...document.querySelectorAll('input')];
            const input =
                inputs[await window.randomBetween(0, inputs.length - 1)];
            const clear = window.fiftyFifty();
            input && clear && (input.value = '');
            input && input.focus();
        });

        const truncate = Math.random() > 0.15;
        const length = utils.randomBetween(0, truncate ? 20 : Infinity);
        const text = starwars().substring(0, utils.randomBetween(0, length));
        await page.keyboard.type(text);

        const pressEnter = utils.fiftyFifty();
        pressEnter && (await page.keyboard.press('Enter'));

        return void output(
            'typer',
            `${chalk.white(text.length)} ${chalk.gray(
                pluralise('characters', text.length)
            )}`,
            pressEnter ? chalk.whiteBright.italic('enter') : ''
        );
    } catch {}
}
