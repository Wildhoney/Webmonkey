import chalk from 'chalk';
import presets from '../helpers/network-presets.mjs';
import * as utils from '../utils.mjs';

export default async function networker({ page, log }) {
    const index = utils.randomBetween(0, presets.length - 1);
    const conditions = presets[index];
    await utils.emulateNetworkConditions(page, conditions);

    return void log(
        'networker',
        chalk.whiteBright(conditions.label),
        chalk.gray('@'),
        `${chalk.whiteBright(conditions.latency)}${chalk.gray('ms')}`,
        chalk.gray('latency')
    );
}
