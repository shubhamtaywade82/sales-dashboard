import { addDays, format } from 'date-fns';
import pool from './db';

// Helper function to generate random dates between January 1, 2024, and September 30, 2024
const getRandomDate = () => {
  const start = new Date('2024-01-01');
  const end = new Date('2024-09-30');
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return format(date, 'yyyy-MM-dd');
};

// Helper function to generate random sales data based on product prices
const generateRandomSales = (productId: number, price: number, quantity: number) => {
  return {
    product_id: productId,
    quantity,
    total: parseFloat((price * quantity).toFixed(2)),
    sale_date: getRandomDate(),
  };
};

// Seed the database
const seedDatabase = async () => {
  try {
    await pool.query('DELETE FROM sales');
    await pool.query('DELETE FROM products');

    const products = [];
    const sales = [];

    // Generate 10 random products
    for (let i = 0; i < 10; i++) {
      const product = {
        name: `Product ${i + 1}`,
        description: `Description for product ${i + 1}`,
        price: parseFloat((Math.random() * (500 - 5) + 5).toFixed(2)), // Random price between 5 and 500
      };
      const result = await pool.query(
        'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING id',
        [product.name, product.description, product.price]
      );
      products.push({ ...product, id: result.rows[0].id });
    }

    console.log(`Seeded ${products.length} products.`);

    // Generate 100 random sales for dates between January 2024 and September 2024
    for (let i = 0; i < 100; i++) {
      const product = products[Math.floor(Math.random() * products.length)]; // Randomly pick one of the products
      const quantity = Math.floor(Math.random() * 20) + 1; // Random quantity between 1 and 20
      const sale = generateRandomSales(product.id, product.price, quantity);

      sales.push(sale);
      await pool.query(
        'INSERT INTO sales (product_id, quantity, total, sale_date) VALUES ($1, $2, $3, $4)',
        [sale.product_id, sale.quantity, sale.total, sale.sale_date]
      );
    }

    console.log(`Seeded ${sales.length} sales.`);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
};
seedDatabase();
