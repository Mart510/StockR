// Contains operational logic for requests between finnhub and postgres

// imports
import { bulkQuoter } from './controllers/finDataController.js';

// //
import dotenv from 'dotenv';

// // set up dot env in this file
dotenv.config();
// //

// set env config for server url
const serverUrl = 'http://localhost:4000'


// get array of all symbols from database
async function createSymbolsArray() {
    // define api url
    const apiURL = `${serverUrl}/symbols`
    console.log(`apiURL = ${apiURL}`);
    // get symbols from database
    let symbolObj = await fetch(apiURL)
    // Get the response body out of the response object
    symbolObj = await symbolObj.json()
    //console.log(symbolObj) // debug logger

    // destructure the payload into just an array of symbols
    const symbolArray = symbolObj.payload.map(objectArray => objectArray.symbol)
    // .map means it's called on each item in the array and returns the .symbol, which gets added to the tickerSymbol Array
    // console.log (`symbolArray at line 32 is: ${symbolArray}`) // debug logger
    
    // return symbolArray;
    //console.log(`Array of symbols created`)
    return symbolArray
    }
    // // return array

// bulk patch quote data into database
async function patcher(patchObject){
    // intialise loop
        for (let objects in patchObject){
        // define api url
        const apiURL = `${serverUrl}/update/${patchObject[objects].symbol}`
        //console.log(`apiURL = ${apiURL}`); // debug logger
        console.log(`${objects} of ${patchObject.length}`)

        // write object to database
        let patchObj = await fetch(apiURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            // creating json body to send
            body: JSON.stringify({
                price_open: patchObject[objects].quote.open,
                price_high: patchObject[objects].quote.high,
                price_low: patchObject[objects].quote.low,
                price_percent_change: patchObject[objects].quote.percentChange,
                price_value_change: patchObject[objects].quote.valueChange,
                price_current: patchObject[objects].quote.current,
                symbol: patchObject[objects].symbol
            })
        }
            )
        }
    // log confirmation message
    console.log('All quotes written to database')

}

// Get results
async function winLoss() {
    // set api url
    let apiURL = `${serverUrl}/max/`;

    // Get and store Top results
    const topResults = {};

    // By value
    let response = await fetch(`${apiURL}value`);
    // parse JSON and clean up the json
    const { payload: maxValpayload } = await response.json();
    topResults.biggestValue = maxValpayload[0];

    // By Percentage
    response = await fetch(`${apiURL}percent`);
    // parse JSON and clean up the json
    const { payload: maxPerpayload } = await response.json();
    topResults.biggestPercent = maxPerpayload[0];

    // Get and store Bottom results
    apiURL = `${serverUrl}/min/`;
    const bottomResults = {};

    // By value
    response = await fetch(`${apiURL}value`);
    // parse JSON and clean up the json
    const { payload: minValpayload } = await response.json();
    bottomResults.worstLoss = minValpayload[0];

    // By percent
    response = await fetch(`${apiURL}percent`);
    // parse JSON and clean up the json
    const { payload: minPerpayload } = await response.json();
    bottomResults.worstPercent = minPerpayload[0];

    return {
        'biggestValue': topResults.biggestValue,
        'biggestPercent': topResults.biggestPercent,
        'worstLoss': bottomResults.worstLoss,
        'worstPercent': bottomResults.worstPercent
    };
}



// Main function
    export async function sNp500Quoteinator(){
    // get symbols array from database
    console.log('Creating array of ticker symbols')
    const tickerArray = await createSymbolsArray();
    // console.log(tickerArray)
    // get bulk quotes using symbols array
    console.log('Fetching quotes')
    const quotePayloadForDatabase = await bulkQuoter(tickerArray);

    // use quotes and symbol to bulk patch data in the database
    console.log('Patching database en masse')
    console.log(quotePayloadForDatabase)
    await patcher(quotePayloadForDatabase)

    const results = await winLoss()

    console.log(results)
    console.log(`Todays winner by value ${results.biggestValue.name} with an increase of ${results.biggestValue.price_value_change}`)
    console.log(`Todays winner by percent ${results.biggestPercent.name} with an increase of ${results.biggestPercent.price_percent_change}%`)
    console.log(`Todays loser by value ${results.worstLoss.name} with a decrease of ${results.worstLoss.price_value_change}`)
    console.log(`Todays loser by value ${results.worstPercent.name} with a decrease of ${results.worstPercent.price_percent_change}$`)
    }

    sNp500Quoteinator();