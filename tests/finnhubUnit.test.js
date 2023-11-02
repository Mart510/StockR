// import block
import {test, expect, expectTypeOf} from 'vitest';
// bulk quote function
import {bulkQuoter} from '../controllers/finDataController.js';

// blank test to confirm set up

test('Set up config confirmation test', function() {
    // blank
});

/*
Test plan for bulkquoter
--------------------------------
testing will be done with MAGMA
bulkQuoter(['META', 'AAPL', 'GOOGL', 'MSFT', 'AMZN'])
--------------------------------
check array is the expected length (5 items)
check it's type of array
check the array contains objects
check array object shape matches expected
check array object.symbols has type of string
check array object.symbols names match
check remaining array object.* are all numbers
--------------------------------
Then run a test with an incorrect symbol
bulkQuoter(aaaa)
check error response string is as expected.
*/

test ('bulkQuoter MAGMA', async function () {

const testObject = await bulkQuoter(['META', 'AAPL', 'GOOGL', 'MSFT', 'AMZN'])

const tObjLen = testObject.length

// check it's type of array
expectTypeOf(testObject).toBeArray();
// check array is the expected length (5 items)
expect(testObject.length).toBe(tObjLen);
// check the array contains objects
for (let i = 0; i < tObjLen; i++) {
expect(testObject[i]).toBeTypeOf('object')
}
// check array object shape matches expected
for (let i = 0; i < tObjLen; i++) {
expect(testObject[i]).toHaveProperty('symbol')
expect(testObject[i]).toHaveProperty('quote')
}
// check array object.symbols has type of string
for (let i = 0; i < tObjLen; i++) {
expect(testObject[i].symbol).toBeTypeOf('string')
}
// check array object.symbols names match
expect(testObject[0].symbol).toBe('META')
expect(testObject[1].symbol).toBe('AAPL')
expect(testObject[2].symbol).toBe('GOOGL')
expect(testObject[3].symbol).toBe('MSFT')
expect(testObject[4].symbol).toBe('AMZN')
// check object.quote has type of array
for (let i = 0; i < tObjLen; i++) {
expect(testObject[i].quote).toBeTypeOf('object')
}
// check the shape of quote
for (let i = 0; i < tObjLen; i ++) {
expect(testObject[i].quote).toHaveProperty('open')
expect(testObject[i].quote).toHaveProperty('high')
expect(testObject[i].quote).toHaveProperty('low')
expect(testObject[i].quote).toHaveProperty('percentChange')
expect(testObject[i].quote).toHaveProperty('valueChange')
}
// check each property of quote is a number
for (let i = 0; i < tObjLen; i++) {
expect(testObject[i].quote.open).toBeTypeOf('number')
expect(testObject[i].quote.high).toBeTypeOf('number')
expect(testObject[i].quote.low).toBeTypeOf('number')
expect(testObject[i].quote.percentChange).toBeTypeOf('number')
expect(testObject[i].quote.valueChange).toBeTypeOf('number')

}
})
