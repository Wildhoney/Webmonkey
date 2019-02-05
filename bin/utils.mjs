import path from 'path';
import process from 'process';
import * as R from 'ramda';

export async function getHooks() {
    const defaults = {
        create: R.identity,
        destroy: R.identity
    };

    try {
        return {
            ...defaults,
            ...(await import(path.resolve(
                process.cwd(),
                'webmonkey.hooks.mjs'
            )))
        };
    } catch {
        return defaults;
    }
}
