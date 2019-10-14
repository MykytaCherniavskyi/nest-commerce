import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { ILoginDTO, IRegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth() {
        return { auth: 'works' };
    }

    @Post('login')
    async login(@Body() userDTO: ILoginDTO) {
        const user = await this.userService.findByLogin(userDTO);
        const payload = {
            username: user.username,
            seller: user.seller,
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post('register')
    async register(@Body() userDTO: IRegisterDTO) {
        const user = await this.userService.create(userDTO);
        const payload = {
            username: user.username,
            seller: user.seller,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}
