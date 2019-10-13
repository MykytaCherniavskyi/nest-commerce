import { Document } from 'mongoose';
import { IUser } from './user';

export interface IProduct extends Document{
    owner: IUser;
    title: string;
    description: string;
    image: string;
    price: string;
    created: Date;
}
