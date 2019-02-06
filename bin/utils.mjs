import path from 'path';
import process from 'process';
import * as R from 'ramda';
import humps from 'humps';

export function getConfig(argv) {
    const defaults = {
        url: 'https://www.google.com/',
        hooks: path.resolve(process.cwd(), 'webmonkey.hooks.mjs'),
        screenshots: path.resolve(process.cwd()),
        debug: false,
        timeout: 10000,
        iterations: 50
    };
    return humps.camelizeKeys({
        ...defaults,
        ...argv,
        hooks: argv.hooks ? path.resolve(argv.hooks) : defaults.hooks
    });
}

export async function getHooks(filepath) {
    const defaults = {
        create: R.identity,
        destroy: R.identity
    };

    try {
        return {
            ...defaults,
            ...(await import(filepath))
        };
    } catch {
        return defaults;
    }
}
