// import the model functions
import * as finDataModel from '../models/finDataModel.js';


// check market status
async function checkMarket() {
if (await finDataModel.marketOpenChecker('US')) {
    console.log('US IS OPEN')
    }
}

//checkMarket();

// get todays quote for MANGA for testing with hard coded array


// Get quotes for every ticker in list
async function bulkQuoter(tickerArray) {
    // object to store all quotes
    const quoteChunk = {
        // symbol and quote as a key value pair
        '' : {},
    }
    // for loop going over and getting quote info for each ticker in MAGMA array
    for (let ticker of tickerArray) {
            // store reply in an object to check it
            const singleReply = await finDataModel.quoteGetter(ticker);
            // if it's not a 200 for success, throw an error and stop
            if (singleReply.response.statusCode !== 200) {
                //console.error(`Error with ${ticker}, stopping function`)
                return;
            // if okay, store the ticker and the quote in quoteChunk
            } else {
                // assings the ticker symbol as the key and pairs it with the quote data
                quoteChunk[`ticker`] = singleReply.quote
            }
            // wait 34ms seconds to see if the loop executes too fast and trips the rate limiter (rate limiter engages at over 30 calls per second, which is 1 call every 33.3ms, this way I'm always above the limiter )
            await new Promise((resolve) => setTimeout(resolve, 34));
        }
        // log job is complete
        //console.log(`${Object.keys(quoteChunk)} quotes fetched, bulkQuoter function complete`)
        console.log(quoteChunk)
    }

bulkQuoter(['META', 'AAPL', 'GOOGL', 'MSFT', 'AMZN'])
