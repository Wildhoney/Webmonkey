import * as R from 'ramda';
import * as actions from './actions/index.mjs';

export function runBehaviour(params) {
    const keys = Object.keys(actions);
    const count = keys.length;
    const name = keys[Math.floor(Math.random() * count)];
    return actions[name](params);
}

export function silenceDialogs(page) {
    page.exposeFunction('print', R.identity);
}

export function exposeFunctions(page) {
    page.exposeFunction('randomBetween', randomBetween);
    page.exposeFunction('fiftyFifty', fiftyFifty);
}

export async function networkConditions(page) {
    const client = await page.target().createCDPSession();
    return client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: (4 * 1024 * 1024) / 8,
        uploadThroughput: (3 * 1024 * 1024) / 8,
        latency: 20
    });
}

export function handleDialogs(page) {
    page.on('dialog', dialog => {
        if (dialog.type() === 'beforeunload') {
            return void dialog.dismiss();
        }
        const f = fiftyFifty() ? 'accept' : 'dismiss';
        return void dialog[f];
    });
}

export function preventNavigation(page) {
    page.evaluate(() => {
        window.onbeforeunload = () => {
            return 'You are not going anywhere...';
        };
    });
}

export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function fiftyFifty() {
    return Math.random() > 0.5;
}
