import 'dotenv/config';
import './hypertest.mjs';
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(express.json());

// Hello World router with PostgreSQL query
app.get('/', async (req, res) => {
  try {
    // Execute the PostgreSQL query: select 1 + 1 as result
    const result = await pool.query('SELECT 1 + 1 AS result');
    
    res.json({
      message: 'Hello World!',
      database_result: result.rows[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      message: 'Hello World!',
      error: 'Database connection failed',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({
      status: 'healthy',
      database: 'connected',
      current_time: result.rows[0].current_time
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Test endpoint with the exact query you mentioned
app.get('/test-query', async (req, res) => {
  try {
    // Note: Corrected the query (assuming you meant 'SELECT 1 + 1 AS result')
    const result = await pool.query('SELECT 1 + 1 AS result');
    
    res.json({
      query: 'SELECT 1 + 1 AS result',
      result: result.rows[0]
    });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({
      error: 'Query execution failed',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await pool.end();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🧪 Test query available at http://localhost:${PORT}/test-query`);
});

export default app;
