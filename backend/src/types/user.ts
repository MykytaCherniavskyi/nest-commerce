import { Document } from 'mongoose';

interface IAddress {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}

export interface IUser extends Document {
    name: string;
    readonly password: string;
    seller: boolean;
    address: IAddress;
    created: Date;
}
