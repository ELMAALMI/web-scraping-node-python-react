import { Category } from './Category';

export type Product = {
    name?: string;
    img?: string;
    url?: string;
    price?: number;
    brand?: string;
    availability?: string;
    delivery?: string;
    feature?: string;
    specifications?: [
        {
            key: string;
            value: string;
        }
    ];
    category?: Category;
};
