// Using this file to test out methods in a quick and dirty fashion as I'm new to some of these libries and systems.
import finnhub from 'finnhub';
import dotenv from 'dotenv';

// set up dot env in this file
dotenv.config();

// Callbacks
const errorCB = (error) => {
    return `Well that didn't work`;
};

// finhub set up
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// assign key from .envfile
api_key.apiKey = process.env.FIN_KEY
// set up the default api client
const finnhubClient = new finnhub.DefaultApi();


// // // gets the quote for apple
// finnhubClient.quote("AAPL", (error, data, response) => {
//     //debug logger // console.log(api_key.apiKey)
//     console.log(data)
//     // debug logger // console.log(response)
// });

// using this as an argument so I can later do this with a return from SQL of the database
// Array of all tickers I want quotes for
const MAGMA = ['META', 'AAPL', 'GOOGL', 'MSFT', 'AMZN']

// testing out getting all the quotes for MANGA using a loop
async function MAGMAQuoter(tickerArray) {

    // for loop going over and getting quote info for each ticker in MAGMA array
    for (let ticker of MAGMA) {
        finnhubClient.quote(ticker, (error, data, response) => {
            // Error message
            if (error) {
                console.log(`Well shit, ticker: ${MAGMA[ticker]}, has an error`)
            } else {
                // log the ticker
                console.log(ticker)
                // log the quote data
                console.log(data);
            }
        })
        // wait 34ms seconds to see if the loop executes too fast and trips the rate limiter (rate limiter engages at over 30 calls per second, which is 1 call every 33.3ms, this way I'm always above the limiter )
        await new Promise((resolve) => setTimeout(resolve, 34));

    }
}

// function call
MAGMAQuoter(MAGMA);