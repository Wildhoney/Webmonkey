#!/usr/bin/env node

import fs from 'fs';
import process from 'process';
import path from 'path';
import figlet from 'figlet';
import capitalise from 'capitalize';
import R from 'ramda';
import chalk from 'chalk';
import minimist from 'minimist';
import run from '../src/index.mjs';
import * as utils from './utils.mjs';
import * as output from './helpers/output.mjs';
import usage from './helpers/usage.mjs';

const argv = minimist(process.argv.slice(2));
const bin = path.dirname(new URL(import.meta.url).pathname);
const pkg = JSON.parse(
    fs.readFileSync(path.resolve(`${bin}/../package.json`), 'utf8')
);

async function main() {
    const header = figlet.textSync(capitalise(pkg.name), { font: 'univers' });
    header && console.log(chalk.gray(header));

    if ((!argv.url && !argv.template) || argv.help) {
        return void console.log(usage());
    }

    console.log(
        '\n',
        chalk.gray('Version:'.padStart(header ? 121 : 0)),
        pkg.version,
        '\n\n'
    );
    const config = utils.getConfig(argv);
    const hooks = await utils.getHooks(config.hooks);
    const report = await utils.emptyReport(config);
    const errors = await run({ ...config, hooks, output, report });

    process.exitCode = R.clamp(0, 1)(errors);
}

main();
