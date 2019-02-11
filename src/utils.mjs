import * as R from 'ramda';
import * as actions from './actions/index.mjs';
import presets from './helpers/network-presets.mjs';

const getCDPSession = R.once(page => page.target().createCDPSession());

const defaultNetworkConditions = R.find(R.propEq('label', 'Regular 4G'))(
    presets
);

export function runAction(params) {
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

export function pageDimensions(page) {
    return page.evaluate(() => ({
        height: window.innerHeight,
        width: window.innerWidth
    }));
}

export async function emulateNetworkConditions(
    page,
    conditions = defaultNetworkConditions
) {
    const client = await getCDPSession(page);
    return client.send(
        'Network.emulateNetworkConditions',
        R.dissoc('label')(conditions)
    );
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
        window.history.pushState = () => {};
        window.history.replaceState = () => {};
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
