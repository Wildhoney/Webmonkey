import chalk from 'chalk';
import numeral from 'numeral';
import capitalise from 'capitalize';
import pluralise from 'pluralize';

export const highlight =
    chalk.level > 1 ? chalk.hex('#ffd2e8') : chalk.magentaBright;

export function error(message) {
    const colour = chalk.level > 1 ? chalk.hex('#ff6666') : chalk.redBright;

    console.log(
        '\n',
        colour.italic.underline('Error'),
        chalk.gray('•'),
        chalk.whiteBright(message),
        '\n'
    );
}

export function info(current, total) {
    const total_ = numeral(total).format('0,0');

    return (type, ...message) => {
        console.log(
            chalk.gray('•'),
            chalk.whiteBright(
                numeral(current)
                    .format('0,0')
                    .padEnd(String(total_).length)
            ),
            chalk.gray(`(of ${total_})`),
            chalk.gray('•'),
            highlight.bold(capitalise(type).padEnd(10)),
            chalk.gray('•'),
            ...message
        );
    };
}

export function summary(total, errors) {
    const colour = errors === 0 ? chalk.greenBright : chalk.redBright;

    console.log(
        `\n${colour('•')}`,
        chalk.gray('Finished running'),
        chalk.whiteBright(numeral(total).format('0,0')),
        chalk.gray('actions which resulted in'),
        chalk.whiteBright(numeral(errors).format('0,0')),
        chalk.gray(`${pluralise('error', total)}.`),
        '\n'
    );
}
