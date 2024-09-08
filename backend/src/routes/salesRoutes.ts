import express from 'express';
import {
  fetchAllSales,
  fetchTotalSales,
  fetchSalesTrends
} from '../controllers/salesController';

const router = express.Router();

router.get('/sales-trends', fetchSalesTrends);
router.get('/total-sales', fetchTotalSales);
router.get('/', fetchAllSales);

export default router;
