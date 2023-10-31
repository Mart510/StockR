// import express app
import { app } from './app.js';

// Configure port
const PORT = process.env.DB_PORT;

// log that server is live and on which port
app.listen(PORT, () => {
    console.log(`Server alive and listening on port ${PORT}`)
});