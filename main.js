// Contains operational logic for requests between finnhub and postgres

// imports
import * as dbController from './controllers/dbController.js'
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
    const symbolObj = await fetch(apiURL)
    // cleanup return object into an array of symbols
    // let symbolArray = [];
    // for (let object in symbolObj) {
    //     symbolArray.push(object.symbol)
    // };
    console.log(`typeof ${typeof symbolObj}
    `)

    const symbols = await symbolObj.json()

    console.log(`symbols: ${JSON.stringify(symbols)}`);
    
    // return symbolArray;
    }
    // // return array
createSymbolsArray()
// bulk quote from finnhub


// bulk patch quote data into database


// Main function
    // get symbols array from database
    // get bulk quotes using symbols array
    // use quotes and symbol to bulk patch data in the database