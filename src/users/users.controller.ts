import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    Get,
    Param,
    ForbiddenException,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from './user-roles.enum';
import { Role } from 'src/auth/decorators/role.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { GetAllUsersDto } from './dtos/get-users.dto';
import { NOMEM } from 'dns';
import { Serializer } from 'v8';
import { Serialize } from 'src/interceptors/serialize.iterceptor';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Serialize(GetAllUsersDto)
    @Get('/all')
    @Role(UserRole.ADMIN)
    async getAllUsers(@Query(ValidationPipe) filterDto: GetAllUsersDto): Promise<User[]> {
        console.log(filterDto)
        return this.usersService.getAllUsers(filterDto);
    }

    @Post()
    @Role(UserRole.ADMIN)
    async createAdminUser(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
        const user = await this.usersService.createAdminUser(createUserDto);
        return {
            user,
            message: 'Administrador cadastrado com sucesso',
        };
    }

    @Get(':id')
    @Role(UserRole.ADMIN)
    async findUserById(@Param('id') id): Promise<ReturnUserDto> {
        const user = await this.usersService.findUserById(id);
        return {
            user,
            message: 'Usuário encontrado',
        };
    }

    @Patch(':id')
    async updateUser(
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @GetUser() user: User,
        @Param('id') id: string,
    ) {
        if (user.role != UserRole.ADMIN && user.id.toString() != id) {
            throw new ForbiddenException(
                'Você não tem autorização para acessar esse recurso',
            );
        } else {
            return this.usersService.updateUser(updateUserDto, id);
        }
    }

    @Delete(':id')
    @Role(UserRole.ADMIN)
    async deleteUser(@Param('id') id: string) {
      await this.usersService.deleteUser(id);
      return {
        message: 'Usuário removido com sucesso',
      };
    }

}