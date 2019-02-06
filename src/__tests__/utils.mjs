import test from 'ava';
import { stub, spy } from "sinon"
import * as utils from '../utils.mjs';
// import * as behaviours from '../behaviours/index.mjs';

test('It should be able to invoke a random behaviour;', t => {
    console.log(utils);
    t.pass();
    // stub(behaviours, {first: spy()              });
    // utils.runBehaviour({});
    // t.is(first.callCount, 1);
    // t.is(second.callCount, 1);
    // t.is(third.callCount, 1);
});
