import * as R from 'ramda';
import * as behaviours from './behaviours/index.mjs';

export function runBehaviour(params) {
    const keys = Object.keys(behaviours);
    const count = keys.length;
    const name = keys[Math.floor(Math.random() * count)];
    return behaviours[name](params);
}

export function silenceDialogs(page) {
    page.exposeFunction('alert', R.identity);
    page.exposeFunction('confirm', R.identity);
    page.exposeFunction('prompt', R.identity);
}

export async function awaitPage(timeout) {
    try {
        await page.waitForNavigation({
            waitUntil: 'load',
            timeout
        });
    } catch {}
}

export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
