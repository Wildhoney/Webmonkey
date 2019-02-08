import * as R from 'ramda';
import * as actions from './actions/index.mjs';

export function runBehaviour(params) {
    const keys = Object.keys(actions);
    const count = keys.length;
    const name = keys[Math.floor(Math.random() * count)];
    return actions[name](params);
}

export function silenceDialogs(page) {
    page.exposeFunction('alert', R.identity);
    page.exposeFunction('confirm', R.identity);
    page.exposeFunction('prompt', R.identity);
    page.exposeFunction('print', R.identity);
}

export function exposeFunctions(page) {
    page.exposeFunction('randomBetween', randomBetween);
    page.exposeFunction('fiftyFifty', fiftyFifty);
}

export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function fiftyFifty() {
    return Math.random() > 0.5;
}
