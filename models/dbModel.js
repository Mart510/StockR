// Model to manage data storage and retrevial from PostGreSQL database

// Importing the pool object so the functions can interact with the database
import { pool } from "../database/index.js";

// basic function to take SQL variable and send it to the database via pool
async function databaseQuery(queryText) {
    const result = await pool.query(queryText);
    return result;
}

// GET all records 
export async function getAll() {
    // Query the database and return all Symbols
    const result = await databaseQuery("SELECT * FROM tickerholder;");

    // Grabs the rows from the response and returns it
    return result.rows;
}

// GET all symbols
export async function getSymbols() {
    // Query the database and return all Symbols
    const result = await databaseQuery("SELECT symbol FROM tickerholder;");

    // Grabs the rows from the response and returns it
    return result.rows;
}

// PATCH records quote data


// GET record with highest gain by value


// GET record with biggest loss by value


// GET record with highest gain by percentage


// GET record with biggest loss by percentage

