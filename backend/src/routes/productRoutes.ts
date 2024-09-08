import express from 'express';
import {
  fetchAllProducts,
  fetchTopProducts
} from '../controllers/productsController';

const router = express.Router();

router.get('/top-products', fetchTopProducts);
router.get('/', fetchAllProducts);

export default router;
