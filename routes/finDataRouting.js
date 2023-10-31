// To handle the API requests for fin data
// To run the express web calls
import express from 'express';

// get the controller functions
import * as finDataController from '../controllers/finDataController.js'

//export the route
export const finDataRoutes = express.Router();

// route to get todays MANGA quote
finDataRoutes.get('/api/v1/quote?symbol=',finDataController.getMANGAQuote);

