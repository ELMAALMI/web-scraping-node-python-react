import { Model, Schema, model } from 'mongoose';
import { ICategory } from './Category';
export interface IProduct {
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
    category?: ICategory;
}

const ProductShema: Schema = new Schema<IProduct>(
    {
        name: {
            type: 'string',
            lowercase: true
        },
        url: {
            type: 'string',
            unique: true
        },
        img: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        brand: {
            type: 'string'
        },
        availability: {
            type: 'string'
        },
        delivery: {
            type: 'string'
        },
        specifications: [
            {
                key: {
                    type: 'string'
                },
                value: {
                    type: 'string'
                }
            }
        ],
        feature: {
            type: 'string'
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    },
    { timestamps: true }
);

export const Product: Model<IProduct> = model<IProduct>('Product', ProductShema);
