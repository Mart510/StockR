// Model to manage data storage and retreival from fin data api
import * as finnhub from 'finnhub';

// Example code fron finnhub docs

// sets the constant API key and assign it to the authentication object
// const api_key = finnhub.ApiClient.instance.authentications['api_key'];

// sample api key from docs
// api_key.apiKey = "ckvneppr01qq199j3130ckvneppr01qq199j313g"

// creates an instance of the defaultapi from finnhub lib.
// const finnhubClient = new finnhub.DefaultApi()

// invokes quote method on the finnhub client object to get stock info, in this case AAPL (Apple), error, data and response are all callback functions I need to create
// finnhubClient.quote("AAPL", (error, data, response) => {
//   console.log(data)
// });


// set constant API key and assigns it to the authentication object
const api_key = finnhub.ApiClient.instance.authentication['finApiKey'];

// assign key from .envfile
api_key.apiKEY = process.env.FIN_KEY

// gets the quote for apple
finnhubClient.quote('AAPL', (error, data, response) => {
    console.log(data)
});

// Get quote data for FAANG (used for testing) 
export async function getMAGMA() {
    // query finnhub for each ticker in MAGMA (M: Meta/META, A: Apple/AAPL, G: Alphabet(Google)/GOOGL, M: Microsoft/MSFT, A: Amazon/AMZN)
    const MAGMA = ['META', 'APPL', 'GOOGL', 'MSFT', 'AMZN']
    // object to hold the responses for each call
    const MAGMAresponse = {
        'META': null,
        'AAPL': null,
        'GOOGL': null,
        'MSFT': null,
        'AMZN': null
    }
    // loop thru the MAGAM and store the results in the variables
    for (let stocks in MAGMA) {
        MAGMAresponse[stocks] =  await MAGMA[stocks]
    }

}

