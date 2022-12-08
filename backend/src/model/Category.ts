import { model, Model, Schema } from 'mongoose';

export interface ICategory {
    id: string;
    name: string;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: 'string'
        }
    },
    { timestamps: true }
);

export const Category: Model<ICategory> = model<ICategory>('Category', CategorySchema);
