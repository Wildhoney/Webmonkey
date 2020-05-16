import fs from 'fs';
import path from 'path';
import process from 'process';
import { promisify } from 'util';
import R from 'ramda';
import humps from 'humps';
import moment from 'moment';
import mkdir from 'mkdirp';
import * as output from './helpers/output.mjs';

export async function getConfig(argv) {
    const template = await readTemplate(argv);

    const config = {
        url: template.url || argv.url || 'https://www.google.com/',
        hooks: argv.hooks || path.resolve(process.cwd(), 'webmonkey.hooks.mjs'),
        reports:
            argv.reports ||
            path.resolve(argv.directory || path.join(process.cwd(), 'reports')),
        debug: argv.debug || false,
        warnings: argv.warnings || false,
        iterations: template.iterations || argv.iterations || 50,
        template: R.isEmpty(template) ? null : template.actions,
        strategy: argv.strategy ? getStrategies(argv.strategy) : {},
    };

    return humps.camelizeKeys({
        ...config,
        hooks: argv.hooks ? path.resolve(argv.hooks) : config.hooks,
    });
}

function getStrategies(strategy) {
    const f = R.compose(
        R.map(Number),
        R.fromPairs(),
        R.map(R.split('=')),
        R.split(',')
    );

    return f(strategy);
}

export async function emptyReport(config) {
    try {
        const { host } = new URL(config.url);
        const name = `${host}_${moment().format('YYYY-MM-DD_HH:mm:ss')}`;
        const report = path.join(config.reports, name);
        mkdir.sync(report);
        mkdir.sync(path.join(report, 'screenshots'));
        return report;
    } catch (error) {
        output.error(error.toString());
        process.exitCode = 1;
        process.exit();
    }
}

export async function getHooks(filepath) {
    const defaults = {
        create: R.identity,
        destroy: R.identity,
    };

    try {
        return {
            ...defaults,
            ...(await import(filepath)),
        };
    } catch {
        return defaults;
    }
}

async function readTemplate(config) {
    if (R.isNil(config.template)) return {};

    try {
        const readFile = promisify(fs.readFile);
        const template = JSON.parse(await readFile(config.template, 'utf-8'));

        return {
            url: template.url,
            actions: template.actions,
            iterations: template.actions.length,
        };
    } catch (error) {
        output.error(error.toString());
        return {};
    }
}
