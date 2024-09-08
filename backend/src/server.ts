import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import salesRoutes from './routes/salesRoutes';
import pool from './db/db';  // Ensure pool is correctly configured for DB connection

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);  // Register product routes
app.use('/api/sales', salesRoutes);       // Register sales routes

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Sales Dashboard API is running');
});

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Simple query to check DB connection
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (error: unknown) {
    console.error('Database connection failed:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Database connection failed', details: error.message });
    } else {
      res.status(500).json({ error: 'Database connection failed', details: 'Unknown error' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
