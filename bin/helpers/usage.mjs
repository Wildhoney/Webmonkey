import chalk from 'chalk';
import { highlight } from './output.mjs';

export default function usage() {
    return `
  ${chalk.italic('Usage:')}

    ${chalk.gray('$')} ${highlight('webmonkey')} ${chalk.gray(
        '--url'
    )} http://www.example.com/


  ${chalk.italic('Options:')}

    ${chalk.gray('--url')}         Domain to use for the testing.
    ${chalk.gray('--hooks')}       Path to the hooks file to setup page.
    ${chalk.gray('--debug')}       Disable headless mode and open devtools.
    ${chalk.gray('--template')}    Re-run the testing from a JSON template.
    ${chalk.gray('--iterations')}  Number of actions to perform ${chalk.gray(
        '(default: 50)'
    )}.
`;
}
