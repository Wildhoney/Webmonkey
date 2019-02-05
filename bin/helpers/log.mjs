import * as R from 'ramda';
import * as theme from './theme.mjs';

const isError = R.equals('error');

export default function log(type, message) {
    const printType = isError(type) ? theme.error : theme.general;

    console.log(
        printType(` ${type} `),
        theme.separator(':'),
        theme.message(message)
    );
}
