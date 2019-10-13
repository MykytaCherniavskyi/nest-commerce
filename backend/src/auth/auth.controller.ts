import {Body, Controller, Post} from '@nestjs/common';
import { UserService } from '../shared/user.service';
import {ILoginDTO, IRegisterDTO} from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) {}

    @Post('login')
    async login(@Body() userDTO: ILoginDTO) {
        return this.userService.findByLogin(userDTO);
    }

    @Post('register')
    async register(@Body() userDTO: IRegisterDTO) {
        return this.userService.create(userDTO);
    }
}
