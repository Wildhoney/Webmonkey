import path from 'path';
import process from 'process';
import R from 'ramda';
import humps from 'humps';
import moment from 'moment';
import mkdir from 'mkdirp';

export function getConfig(argv) {
    const defaults = {
        url: 'https://www.google.com/',
        hooks: path.resolve(process.cwd(), 'webmonkey.hooks.mjs'),
        reports: path.resolve(path.join(process.cwd(), 'reports')),
        debug: false,
        iterations: 50
    };
    return humps.camelizeKeys({
        ...defaults,
        ...argv,
        hooks: argv.hooks ? path.resolve(argv.hooks) : defaults.hooks
    });
}

export async function emptyReport(config) {
    const { host } = new URL(config.url);
    const name = `${host}_${moment().format('YYYY-MM-DD_HH:mm:ss')}`;
    const report = path.join(config.reports, name);
    mkdir.sync(report);
    mkdir.sync(path.join(report, 'screenshots'));
    return report;
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
