import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    UseGuards,
    Req,
    Param,
    Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CredentialsDto } from 'src/users/dtos/credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
        await this.authService.signUp(createUserDto);
        return {
            message: 'Cadastro realizado com sucesso',
        };
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    ): Promise<{ token: string }> {
        return await this.authService.signIn(credentiaslsDto);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user;
    }
}