import pool from '../db/db'

export type Product = {
  id?: number;
  name: string;
  description?: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
};

export type ProductCount = {
  name: string;
  total_sold: number;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await pool.query('SELECT * FROM products ORDER BY id ASC');

  return res.rows;
};

export const getTopProducts = async (): Promise<{ name: string; total_sold: number }[]> => {
  const res = await pool.query(`
    SELECT p.name, SUM(s.quantity) AS total_sold
    FROM products p
    JOIN sales s ON s.product_id = p.id
    GROUP BY p.name
    ORDER BY total_sold DESC
    LIMIT 5;
  `);
  return res.rows;
};