// Contains operational logic for requests between finnhub and postgres

// imports
import * as dbController from './controllers/dbController.js'
import { bulkQuoter } from './controllers/finDataController.js';
import * as dbRoutes from './routes/dbRouting.js'

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
    console.log(`Array of symbols created`)
    return symbolArray
    }
    // // return array


// bulk quote from finnhub


// bulk patch quote data into database
// async function patcher(patchObject){
    
// }


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
    //console.log('Patching database en masse')
    console.log(quotePayloadForDatabase)

    }

    sNp500Quoteinator();