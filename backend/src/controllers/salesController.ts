import { Request, Response } from 'express';
import {
  getAllSales,
  getSalesTrends,
  getTotalSales
} from '../models/salesModel';

export const fetchAllSales = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const sales = await getAllSales(
      startDate ? new Date(startDate as string) : null,
      endDate ? new Date(endDate as string) : null
    );
    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchSalesTrends = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const salesTrends = await getSalesTrends(
      startDate ? new Date(startDate as string) : null,
      endDate ? new Date(endDate as string) : null
    );

    // Map through salesTrends to format the 'day' field as 'YYYY-MM-DD'
    const formattedSalesTrends = salesTrends.map(trend => ({
      ...trend,
      day: new Date(trend.day).toISOString().split('T')[0],  // Format the date to 'YYYY-MM-DD'
    }));

    res.json(formattedSalesTrends);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchTotalSales = async (req: Request, res: Response) => {
  try {
    const totalSales = await getTotalSales();
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};