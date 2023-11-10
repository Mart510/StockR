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
    const result = await databaseQuery(`SELECT * FROM tickerholder;`);

    // Grabs the rows from the response and returns it
    return result.rows;
}

// GET all symbols
export async function getSymbols() {
    // Query the database and return all Symbols
    const result = await databaseQuery(`SELECT symbol FROM tickerholder;`);

    // Grabs the rows from the response and returns it
    return result.rows;
}

// PATCH records quote data
export async function updateQuoteData(symbol, newQuoteData) {
    // query the database to update quote data, return the symbol that's been updated or null
    const queryText = (`
        UPDATE tickerholder
        SET price_open = $1,
            price_high = $2,
            price_low = $3,
            price_percent_change = $4,
            price_value_change = $5,
            price_current = $6
        WHERE symbol = $7
        RETURNING symbol;
    `)

    // sending the request with the new data
    const result = await pool.query(queryText, [
        newQuoteData.price_open,
        newQuoteData.price_high,
        newQuoteData.price_low,
        newQuoteData.price_percent_change,
        newQuoteData.price_value_change,
        newQuoteData.price_current,
        newQuoteData.symbol,
    ])
    console.log(`symbol ${newQuoteData.symbol}`)
    console.log(`open ${newQuoteData.price_open}`)
    console.log(`high ${newQuoteData.price_high}`)
    console.log(`low ${newQuoteData.price_low}`)
    console.log(`percent change ${newQuoteData.price_percent_change}`)
    console.log(`value change ${newQuoteData.price_value_change}`)

    //console.log(result)
    // Returns just the symbol for confirmation
    return result || null
}

// GET record with highest gain by value
export async function getHighestbyVal() {
    // query the database to get the record with the biggest value_change property
    const result = await databaseQuery(`SELECT * FROM tickerholder WHERE price_value_change = (SELECT MAX(price_value_change) FROM tickerholder);`);

    return result.rows;
}

// GET record with biggest loss by value
export async function getWorstbyVal() {
    // query the database to get the record with the smallest value_change property
    const result = await databaseQuery(`SELECT * FROM tickerholder WHERE price_value_change = (SELECT MIN(price_value_change) FROM tickerholder);`);
    
    return result.rows;

}

// GET record with highest gain by percentage
export async function getHighestbyPercent() {
    // query the database to get the record with the biggest percent_change property
    const result = await databaseQuery(`SELECT * FROM tickerholder WHERE price_percent_change = (SELECT MAX(price_percent_change) FROM tickerholder);`);
    
    return result.rows;

}

// GET record with biggest loss by percentage
export async function getWorstbyPercent() {
    // query the database to get the record with the smallest percent_change property
    const result = await databaseQuery(`SELECT * FROM tickerholder WHERE price_percent_change = (SELECT MIN(price_percent_change) FROM tickerholder);`);
    
    return result.rows;

}
