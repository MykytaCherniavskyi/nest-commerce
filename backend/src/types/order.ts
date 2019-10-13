import { Document } from 'mongoose';
import { IUser } from './user';
import { IProduct } from './product';

interface IProductOrder {
    product: IProduct;
    quantity: number;
}

export interface IOrder extends Document {
    owner: IUser;
    totalPrice: number;
    products: IProductOrder[];
    created: Date;
}
