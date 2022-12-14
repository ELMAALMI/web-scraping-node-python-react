import { NextFunction, Request, Response, Router } from 'express';
import { productController } from './controllers/product-controller';
import scrapper from './scrapper';

const router = Router();

router.get('/products', productController.retreiveAll);
router.get('/products/:categoryId', productController.retreiveByCategory);
router.get('/categories', productController.retreiveCategories);
router.get('/start-scrapping', (req: Request, res: Response, next: NextFunction) => {
    try {
        scrapper.start();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default router;
