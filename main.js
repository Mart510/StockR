// Contains operational logic for requests between finnhub and postgres

// imports
import * as dbController from './controllers/dbController.js'


// get array of all symbols from database
async function createSymbolsArray() {
    // get symbols from database
    const symbolObj = await dbController.getDataDump().payload;
    // cleanup return object into an array of symbols
    // let symbolArray = [];
    // for (let object in symbolObj) {
    //     symbolArray.push(object.symbol)
    // };
    console.log(symbolObj);
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