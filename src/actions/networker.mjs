import chalk from 'chalk';
import presets from '../helpers/network-presets.mjs';
import * as utils from '../utils.mjs';

export default async function networker({ page, output, template }) {
    const index = utils.randomBetween(0, presets.length - 1);
    const conditions = template.conditions || presets[index];

    try {
        await utils.emulateNetworkConditions(page, conditions);

        output(
            'networker',
            chalk.whiteBright(conditions.label),
            chalk.gray('@'),
            `${chalk.whiteBright(conditions.latency)}${chalk.gray('ms')}`,
            chalk.gray('latency')
        );
    } catch {}

    return { name: 'networker', meta: { conditions } };
}
