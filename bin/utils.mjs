import path from 'path';
import process from 'process';
import * as R from 'ramda';

export async function getHooks(filepath) {
    const defaults = {
        create: R.identity,
        destroy: R.identity
    };

    try {
        return {
            ...defaults,
            ...(await import(filepath
                ? path.resolve(filepath)
                : path.resolve(process.cwd(), 'webmonkey.hooks.mjs')))
        };
    } catch {
        return defaults;
    }
}
