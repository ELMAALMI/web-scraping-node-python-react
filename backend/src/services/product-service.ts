import { Category } from '../model/Category';
import { IProduct, Product } from '../model/Product';

class ProductService {
    async create(product: IProduct) {}
    async update(product: IProduct) {}
    async delete(product: IProduct) {}
    async fetchAll() {
        const products = await Product.find().populate('category');
        return products;
    }
    async fetchAllCategories() {
        const categories = await Category.find();
        return categories;
    }
    async fetchByCategory(category: string) {
        const products = await Product.find({ category: { _id: category } }).populate('category');
        return products;
    }
}

export const productService = new ProductService();
