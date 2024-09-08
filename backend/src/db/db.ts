import { Pool } from 'pg';
import dotenv from 'dotenv';
import { console } from 'inspector';

dotenv.config();

console.warn('DB_USER:', process.env.DB_USER);
console.warn('DB_PASSWORD:', process.env.DB_PASSWORD); // Make sure it's a valid string


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: "password",  // Ensure this is properly loaded as a string
  port: Number(process.env.DB_PORT) || 5432,  // Ensure port is a number
});

export default pool;
