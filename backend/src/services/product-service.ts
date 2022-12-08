import { IProduct, Product } from '../model/Product';

class ProductService {
    async create(product: IProduct) {}
    async update(product: IProduct) {}
    async delete(product: IProduct) {}
    async fetchAll() {
        const products = await Product.find();
        return products;
    }
    async fetchByCategory(category: string) {
        const products = await Product.find({ category });
        return products;
    }
}

export const productService = new ProductService();
