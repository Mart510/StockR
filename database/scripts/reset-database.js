// imports
import { pool } from "../index.js"
import {readFile} from 'fs/promises'; // to be able to parse JSONs

async function dropTables(){
    // drop tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS tickerholder;
    `);
    console.log('Tables dropped')
    }

async function createTable(){
    // create new tables
    await pool.query(`
        CREATE TABLE tickerholder (
            symbol VARCHAR(10) PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            sector VARCHAR(100) NOT NULL,
            price_open NUMERIC(10,4),
            price_high NUMERIC(10,4),
            price_low NUMERIC(10,4),
            price_percent_change NUMERIC(10,4),
            price_value_change NUMERIC(10,4),
            price_current NUMERIC(10,4)
        );
    `);
    console.log('tickerholder table created')
    }

async function seedData() {

    // parse s&p500.JSON ready for seeding
    const rawData = await readFile('sANDp500.json',  'utf8'); // Note: FS relative paths are relative to the currently executing module (in this case NODE) so the path is Stockreport/sANDp500.json
    const dataArray = JSON.parse(rawData);
    // console.log(dataArray) // debug logger
    // SQL variable to seed data
    const SQLInsertinator = (`
        INSERT INTO tickerholder (symbol, name, sector)
        VALUES ($1, $2, $3);
    `);

    // Loop to process dataArray and seed table
    for (let ticker of dataArray) {
        console.log(`Writing ${ticker.Symbol} operation ${dataArray.indexOf(ticker) + 1 } of ${dataArray.length} to database`)
    await pool.query(SQLInsertinator, [
        ticker.Symbol,
        ticker.Name,
        ticker.Sector
    ])
        }
    console.log('Database seeding complete')
    }

// Database reset
async function resetDatabase(){
    try {
        await dropTables();
        await createTable();
        await seedData();
        console.log('Database reset complete');
    } catch (error) {
        console.error('Database reset fails:', error);
    } finally {
        // End the pool object
        await pool.end();
    }
}

resetDatabase();