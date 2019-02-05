import * as behaviours from './behaviours/index.mjs';

export function runBehaviour(page) {
    const keys = Object.keys(behaviours);
    const count = keys.length;
    const name = keys[Math.floor(Math.random() * count)];
    return behaviours[name](page);
}
