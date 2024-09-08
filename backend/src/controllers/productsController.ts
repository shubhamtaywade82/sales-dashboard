import { Request, Response } from 'express';
import {
  getAllProducts,
  getTopProducts
} from '../models/productModel';

export const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } else {
      console.error('Unknown error fetching products');
      res.status(500).json({ error: 'Internal Server Error', details: 'Unknown error' });
    }
  }
};

export const fetchTopProducts = async (req: Request, res: Response) => {
  try {
    const topProducts = await getTopProducts();
    res.json(topProducts);
  } catch (error) {

    console.error('Error fetching top products:', error);

    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message, stack: error.stack });
    } else {
      res.status(500).json({ error: 'Internal Server Error', details: 'Unknown error' });
    }
  }
};

