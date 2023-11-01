// Model to manage data storage and retreival from fin data api
import { finnhubClient } from "../finnhubConfig.js";

// Check if the markets open
export async function gameTime(exchangeCode) {
    // object to store return info
    let marketStatusInfo;
    // set up promise for the data
    await new Promise((resolve, reject) => {
    // pass exchange code i.e US as a string to finnhub api client function
    finnhubClient.marketStatus({'exchange': String(exchangeCode)}, (error, data, response) => {
        if (error) {
            // error message
            console.error(`Error getting ${exchangeCode}, market status`)
            // promise error
            reject(console.error(`Error promise for ${exchangeCode}, unfulfilled`))
        } else {
                marketStatusInfo = {
                    market: exchangeCode,
                    isOpen: data,
                    response: response,
                }
            }
        })
        // full fill the promise
        resolve(marketStatusInfo);
    })
    // pass the info on
    return marketStatusInfo;
}

// Get quote
export async function quoteGetter(ticker) {
    // object to store return info
    let quoteData;
    // set up the promise for the data
    await new Promise((resolve, reject) => {
    // call quote function
    finnhubClient.quote(ticker, (error, data, response) => {
        if (error) {
            // Error message
            console.error(`Error with ticker ${ticker}`);
            // Error for promise
            reject(console.error(`quoteData promise for ${ticker}, unfulfilled`))
        } else {
            // create object 
            quoteData = {
                symbol: ticker,
                quote: data,
                response: response,
            };
            // resolve promise with data
            resolve(quoteData);
        }
    })
})
    // return the quoteData object
    return quoteData;
}


// debug in place tester and logger, to be replaced with a proper unit test.
// let quoteyBoi = await quoteGetter('AAPL')

// console.log(quoteyBoi.symbol)
// console.log(quoteyBoi.quote)