
# StockR
 Personal project to practice using APIs and databases. It returns the 2 best and 2 worst performing stocks on the S&P500 today (by share value and by percentage). Currently this is only logged to console.

## Features

- Returns todays performance for all stocks on the S&P500 for today and stores it in a postgres database
- Returns best stock by increase in value, and by increase by percentage
- Returns worst stock by increase in value, and by increase by percentage
- Reset postgres database 

## Installation

```bash
  npm install
```
    
## Dependencies
- DotENV: to handle environment variables
- express: a minimal and flexible Node.js web app framwork for builind web applications and APIs
- PG: to handle postgres functions in js
- morgan: to log the status of the server
- finnhub: library provided by Finnhub.io to streamline interaction with their API
- .env file: to be created in your repo, see the next section for details
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

DATABASE_URL= <url to a postgres database see below for recomendations>

DB_PORT= <set this to whatever port you want to run it locally on>

FIN_KEY= <finnhub API key goes here>



## Set up checklist
Once you have downloaded this repo to get it up and running you will need to do the following:
- set up a postgres database, the free tier on elephantSQL is more than enough for this project (https://www.elephantsql.com/)
- get a free API key from finnhub.io (https://finnhub.io/)
- create a .env file with the required varibales filled out
## Running the project
- Run the command: 'npm run dev' in your terminal
- Wait for the confirmation message informing you the server is alive and running
- Open a new terminal instance and run the command: 'node main.js'
- The full project takes around 9 minutes to run due to finnhub api limits, observe the progress in your console.

## Program stages
This section is to give you an overview of how the console will behave so you can understand where in the process the project is.

#### Terminal 1 (server): 
1. Live state: [nodemon] starting `node -r dotenv/config server.js`
2. Logging patch requests to database state (approx runtime: 30 secs):

            symbol <example>
            open 205.05
            high 208.87
            low 204.1
            percent change 1.9062
            value change 3.855


#### Terminal 2 (main.js):
1. Quoting state (approx runtime: 9 minutes):

                Symbol: <example>
                Today's Open: 214.54
                Highest: 217.4
                Lowest: 213.98

2. Writing to database state (approx runtime: 30 secs)
3. Winners and losers state:

     Todays biggest gain by value is <example> with an increase of 298.4500
     Todays biggest gain by percent is <example> with an increase of 32.8571%
     Todays worst performer by value is <example> with a decrease of -36.7700
     Todays worst performer by percent is <example> with a decrease of -2.8975$
 
## Next steps
- To add a dashboard interface
- Deploy the project
- Have the system automatically update itself once a day
- To store a log of previous days best and worst performers
## Authors
<a href="https://github.com/Mart510">
        <img src="https://github.com/Mart510.png" width="100" height="100" alt="Mart510">
</a>

