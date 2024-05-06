import { Controller, Get, Post, Body, Headers, Request } from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';
import {
    Response,
    Requestparameter,
    Headerparameter,
} from 'src/common/interfaces/api.interface';
import { AuthorizationService } from './authorization.service';
import { freeLoginDTO, LoginDTO, RegistCanteenDTO } from './dto/login.dto'; // 引入 DTO

@Controller('authorization')
export class AuthorizationController {
    constructor(private readonly authorizationService: AuthorizationService) { }

    @Public()
    @Post('/login')
    async login(
        @Body() body: LoginDTO,
    ): Promise<Response<{ access_token: string }>> {
        return await this.authorizationService.login(
            body.username,
            body.password,
        );
    }

    @Public()
    @Post('/register')
    async register(
        @Body() body: LoginDTO,
    ): Promise<Response> {
        return await this.authorizationService.register(
            body.username,
            body.password,
        );
    }

}
