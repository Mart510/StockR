// imports from Node
import express from 'express'; // web app framework for api calls
import morgan from 'morgan'; // logging middleware

// imports from routes


// Set up Express server
export const app = express();

app.use(morgan('tiny'));
app.use(express.json()); // built-in middle ware to parse JSON payloads


