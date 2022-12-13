import { Router } from 'express';
import { productController } from './controllers/product-controller';

const router = Router();

router.get('/products', productController.retreiveAll);
router.get('/products/:categoryId', productController.retreiveByCategory);
router.get('/categories', productController.retreiveCategories);

export default router;
