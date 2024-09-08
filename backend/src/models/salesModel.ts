import pool from '../db/db'

export type Sale = {
  date: string | number | Date;
  id?: number;
  product_id: number;
  quantity: number;
  total: number;
  sale_date: Date;
};

export type SalesTrend = {
  day: string;
  total: number;
};

export const getAllSales = async (startDate: Date | null, endDate: Date | null): Promise<Sale[]> => {
  const queryParams: (Date | null)[] = [];
  let query = 'SELECT * FROM sales';

  if (startDate && endDate) {
    query += ' WHERE sale_date BETWEEN $1 AND $2';
    queryParams.push(startDate, endDate);
  }

  query += ' ORDER BY sale_date ASC';
  const res = await pool.query(query, queryParams);
  return res.rows;
};

export const getSalesTrends = async (startDate: Date | null, endDate: Date | null): Promise<SalesTrend[]> => {
  const queryParams: (Date | null)[] = [];
  let query = `
    SELECT CAST(date_trunc('day', sale_date) AS DATE) AS day, SUM(total) AS total_sales FROM sales
  `;

  if (startDate && endDate) {
    query += ' WHERE sale_date BETWEEN $1 AND $2';
    queryParams.push(startDate, endDate);
  }

  query += ' GROUP BY day ORDER BY day ASC;';
  const res = await pool.query(query, queryParams);
  return res.rows;
};

export const getTotalSales = async (): Promise<number> => {
  const res = await pool.query('SELECT SUM(total) AS total_sales FROM sales');
  return res.rows[0].total_sales;
};