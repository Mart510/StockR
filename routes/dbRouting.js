// To handle the API requests for the database
// To run the express web calls
import express from 'express';

// get the controller functions
import * as dbController from '../controllers/dbController.js'

//export the route
export const dbRoutes = express.Router();

// route to get data dump
dbRoutes.get("/dumpy", dbController.getDataDump);

// route to get symbols
dbRoutes.get("/symbols", dbController.getSymbolArray);

// route for PATCH call
dbRoutes.patch("/update/:symbol" , dbController.updateQuoteData);

// experiment route to get symbols
export const symbolArrayGetter = dbRoutes.get("/symbols", dbController.getSymbolArray);
