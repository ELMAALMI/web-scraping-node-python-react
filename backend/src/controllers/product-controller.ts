import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product-service';

class ProductController {
    async retreiveAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.fetchAll();
            console.log(products);
            return res.status(200).send(products);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async retreiveByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { categoryId } = req.params;
            const products = productService.fetchByCategory(categoryId);
            res.status(200).send(products);
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();
