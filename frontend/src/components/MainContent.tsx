import React, { useEffect, useState } from 'react';
import productService from '../services/product-service';
import { Category } from '../types/Category';
import { Product } from '../types/Product';

const MainContent: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const fetch_data = async () => {
        try {
            const [categories, products] = await Promise.all([
                productService.fetch_categories(),
                productService.fetch_product()
            ]);
            setCategories(categories);
            setProducts(products);
            setSelectedCategory('');
        } catch (error) {
            console.log(error);
        }
    };
    const filter_by_category = async (categorie: string) => {
        try {
            const [products] = await Promise.all([
                productService.fetch_products_by_categories(categorie)
            ]);
            setSelectedCategory(categorie);
            setProducts(products);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetch_data();
    }, []);
    return (
        <div className="flex w-full px-20 flex-col">
            <h2 className="font-normal text-3xl mb-6">Products List</h2>

            <div className="flex">
                <div className="mr-2 w-[300px]">
                    <div className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <a
                            onClick={() => fetch_data()}
                            aria-current="true"
                            className={`block py-2 px-4 w-full ${
                                selectedCategory === '' && 'text-white bg-blue-700'
                            } rounded-t-lg border-b border-gray-200 cursor-pointer`}
                        >
                            All
                        </a>
                        {categories.map((item) => (
                            <a
                                key={item._id}
                                onClick={() => filter_by_category(item._id ?? '')}
                                className={`block ${
                                    selectedCategory == item._id && 'text-white bg-blue-700'
                                } py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
                            >
                                {item.name}
                                {/* {item._id} */}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mr-2 w-full flex justify-between flex-wrap">
                    {products.map((item) => (
                        <ProductCard product={item} key={item.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default MainContent;
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <a
            href={product.url}
            target="_blank"
            className="w-full max-w-xs bg-white rounded-lg shadow mb-5 dark:bg-gray-800 dark:border-gray-700"
        >
            <a href={product.url} target="_blank">
                <img className="p-8 rounded-t-lg" src={product.img} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href={product.url} target="_blank">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.name?.slice(0, 30)}...
                    </h5>
                </a>
                <p>{product.feature}</p>
                <p className="mt-2 text-blue-600">{product.delivery}</p>
                <p className="mt-2 text-green-500">{product.availability}</p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.price}$
                    </span>
                </div>
            </div>
        </a>
    );
};
