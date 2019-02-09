import chalk from 'chalk';
import numeral from 'numeral';
import capitalise from 'capitalize';

export default function log(current, total) {
    const getTypeColour = () =>
        chalk.level > 1 ? chalk.hex('#ffd2e8') : chalk.magentaBright;

    return (type, ...message) => {
        console.log(
            chalk.gray('•'),
            chalk.whiteBright(
                numeral(current)
                    .format('0,0')
                    .padEnd(String(total).length)
            ),
            chalk.gray(`(of ${numeral(total).format('0,0')})`),
            chalk.gray('•'),
            getTypeColour().bold(capitalise(type).padEnd(10)),
            chalk.gray('•'),
            ...message
        );
    };
}
