// imports from Node
import express from 'express'; // web app framework for api calls
import morgan from 'morgan'; // logging middleware

// set up dot env in this file
//dotenv.config();

// imports from routes
import { dbRoutes } from './routes/dbRouting.js';

// Set up Express server
export const app = express();

app.use(morgan('tiny'));
app.use(express.json()); // built-in middle ware to parse JSON payloads

app.use("/", dbRoutes)

