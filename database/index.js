// For all the database set up reqs
// Import node-postgres (PG)
import pg from 'pg';


// Get the database connection string from the .env
const connectionString = process.env.DATABASE_URL;

// Check if the connection is not defined and throw and error
if (!connectionString) {
    throw new Error(
        'No DATABASE_URL defined. Check .env variables'
    );
}

// Export instance of pg.Pool for interaction with the Elephant SQL PostgreSQL database
export const pool = new pg.Pool({
    // Pass connection string to pool so it know's how to connect
    connectionString,
})
