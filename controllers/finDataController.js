// import the model functions
import * as finDataModel from '../models/finDataModel.js';


// check market status
export async function checkMarket() {
if (await finDataModel.marketOpenChecker('US')) {
    console.log('US IS OPEN')
    }
}

// currently returns 401 I don't have access error. To debug later
//checkMarket();

// get todays quote for MANGA for testing with hard coded array


// Get quotes for every ticker in list
export async function bulkQuoter(tickerArray) {
    // array to store all the quote data
    let quoteChunk = [];
    try {
    console.log(`Starting bulk quotation with ${tickerArray.length} symbols`)
    // for loop going over and getting quote info for each ticker in MAGMA array
    for (let ticker of tickerArray) {
        try {
            // store reply in an object to check it
            const singleReply = await finDataModel.quoteGetter(ticker);
            //Debuge Logger the status code from the response
            //console.log(`Status code for ${ticker}: ${singleReply.response.statusCode}`)
            // Log the quote in an easy to read manner
            console.log(`
                Symbol: \x1b[35m${ticker}\x1b[0m
                Today's Open: \x1b[33m${singleReply.quote.o}\x1b[0m
                Highest: \x1b[32m${singleReply.quote.h}\x1b[0m
                Lowest: \x1b[31m${singleReply.quote.l}\x1b[0m\n`)
                    
            // \x1b[someNumberm tells the terminal to change the text color from this point. and \x1b[0m tells the terminal to reset to default from this point. This is done to tmake the terminal more readable

            // if it's not a 200 for success, throw an error and stop
            if (singleReply.response.statusCode !== 200) {
                console.error(`Error with ${ticker}, stopping function`)
                return;
            // if okay, store the ticker and the quote in quoteChunk
            } else {
                // adds the quote data as an object into the array
                quoteChunk.push(
                    {
                    symbol: ticker,
                    quote: 
                        {
                        open: singleReply.quote.o,
                        high: singleReply.quote.h,
                        low: singleReply.quote.l,
                        percentChange: singleReply.quote.dp,
                        valueChange: singleReply.quote.d,
                        current: singleReply.quote.c
                        }
                    }
                    )
            }
            // wait 34ms seconds to see if the loop executes too fast and trips the rate limiter (rate limiter engages at over 30 calls per second, which is 1 call every 33.3ms, this way I'm always above the limiter )
            await new Promise((resolve) => setTimeout(resolve, 1001));
        } catch (error) {
            console.error(`Error with ${ticker}: ${error.message}`);
            }
        }
    } catch (error) {
            console.error(`An error occurred in bulkQuoter: ${error.message}`);
        } finally {      
    // log job is complete
    console.log(`${Object.keys(quoteChunk)} quotes fetched, bulkQuoter function complete`)
    console.log(`quoteChunk: ${quoteChunk}`)
    }
    return quoteChunk;
}