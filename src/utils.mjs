import * as R from 'ramda';
import * as behaviours from './behaviours/index.mjs';

export function runBehaviour(params) {
    const keys = Object.keys(behaviours);
    const count = keys.length;
    const name = keys[Math.floor(Math.random() * count)];
    return behaviours[name](params);
}

export function mockNatives(page) {
    page.exposeFunction('alert', R.identity);
    page.exposeFunction('confirm', R.identity);
    page.exposeFunction('prompt', R.identity);
}
