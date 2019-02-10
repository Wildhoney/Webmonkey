import chalk from 'chalk';
import numeral from 'numeral';
import capitalise from 'capitalize';

export function error(message) {
    const getTypeColour = () =>
        chalk.level > 1 ? chalk.hex('#ff6666') : chalk.redBright;

    console.log(
        '\n',
        getTypeColour().italic.underline('Error'),
        chalk.gray('•'),
        chalk.whiteBright(message),
        '\n'
    );
}

export function info(current, total) {
    const getTypeColour = () =>
        chalk.level > 1 ? chalk.hex('#ffd2e8') : chalk.magentaBright;

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
            getTypeColour().bold(capitalise(type).padEnd(10)),
            chalk.gray('•'),
            ...message
        );
    };
}

export function summary(total, errors) {
    const getErrorColour = () =>
        errors === 0 ? chalk.greenBright : chalk.redBright;

    console.log(
        `\n${getErrorColour()('•')}`,
        chalk.gray('Finished running'),
        chalk.whiteBright(total),
        chalk.gray('actions which resulted in'),
        chalk.whiteBright(errors),
        chalk.gray('errors.'),
        '\n'
    );
}
