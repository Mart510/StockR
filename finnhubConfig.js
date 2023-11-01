// imports
import finnhub from 'finnhub';
import 'dotenv/config'

// finhub set up
export const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// assign key from .envfile
api_key.apiKey = process.env.FIN_KEY
// set up the default api client
const finnhubClient = new finnhub.DefaultApi();

// ready as a named export
export { finnhubClient };

// test logger
// console.log(`finnhubKey = ${api_key.apiKey}`);