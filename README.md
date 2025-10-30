# Express PostgreSQL App

A basic Express.js application with PostgreSQL integration using ES modules.

## Features

- Express.js server with ES modules
- PostgreSQL database integration
- Hello World endpoint with database query
- Health check endpoint
- Error handling and graceful shutdown

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL:**
   - Make sure PostgreSQL is running on your system
   - Create a database (or use the default 'postgres' database)
   - Copy `.env.example` to `.env` and update database credentials:
     ```bash
     cp .env.example .env
     ```

3. **Run the application:**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## Endpoints

- `GET /` - Hello World with database query (SELECT 1 + 1 AS result)
- `GET /health` - Health check with database connection test
- `GET /test-query` - Direct test of the PostgreSQL query

## Example Response

```json
{
  "message": "Hello World!",
  "database_result": {
    "result": 2
  },
  "timestamp": "2025-10-30T12:00:00.000Z"
}
```

## Database Configuration

The app uses environment variables for database configuration:

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: postgres)
- `DB_USER` - Database user (default: postgres)
- `DB_PASSWORD` - Database password (default: password)

## Notes

- The query `SELECT 1 + 1 AS result` returns `{"result": 2}`
- The app includes error handling for database connection failures
- Graceful shutdown is implemented to close database connections properly