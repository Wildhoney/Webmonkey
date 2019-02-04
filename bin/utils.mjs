import path from 'path';
import process from 'process';
import * as R from 'ramda';

const defaultConfig = {
    setup: R.identity
};

export async function getConfig() {
    try {
        const config = await import(path.resolve(
            process.cwd(),
            'webmonkey.config.mjs'
        ));
        return { ...defaultConfig, ...config };
    } catch (error) {
        return defaultConfig;
    }
}
