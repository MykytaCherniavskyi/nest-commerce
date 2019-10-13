import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { IUser } from '../types/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ILoginDTO, IRegisterDTO } from '../auth/auth.dto';
import { HttpExceptionFilter } from './http-exception.filter';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) {}

    private sanitizeUser(user: IUser) {
        return user.depopulate('password');
    }

    async create(userDTO: IRegisterDTO) {
        const { username } = userDTO;
        const user = await this.userModel.findOne({ username });

        if (user) {
            throw new HttpExceptionFilter('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: ILoginDTO) {
        const { username, password } = userDTO;
        const user = await this.userModel.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
