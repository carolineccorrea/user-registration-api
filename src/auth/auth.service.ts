import {
    Injectable,
    UnprocessableEntityException,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/user-roles.enum';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CredentialsDto } from 'src/users/dtos/credentials.dto';
import { UserRepository } from 'src/users/user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return await this.userRepository.createUser(createUserDto, UserRole.USER);
        }
    }

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const jwtPayload = {
            id: user.id,
        };
        const token = await this.jwtService.sign(jwtPayload);

        return { token };
    }

    async changePassword(
        id: string,
        changePasswordDto: ChangePasswordDto,
      ): Promise<void> {
        const { password, passwordConfirmation } = changePasswordDto;
    
        if (password != passwordConfirmation)
          throw new UnprocessableEntityException('As senhas não conferem');
    
        await this.userRepository.changePassword(id, password);
      }

    async resetPassword(
        recoverToken: string,
        changePasswordDto: ChangePasswordDto,
      ): Promise<void> {
        const user = await this.userRepository.findOne(
          { recoverToken },
          {
            select: ['id'],
          },
        );
        if (!user) throw new NotFoundException('Token inválido.');
    
        try {
          await this.changePassword(user.id.toString(), changePasswordDto);
        } catch (error) {
          throw error;
        }
      }

    async sendRecoverPasswordEmail(email: string): Promise<void> {
        const user = await this.userRepository.findOne({ email });
    
        if (!user)
          throw new NotFoundException('Não há usuário cadastrado com esse email.');
    
        user.recoverToken = randomBytes(32).toString('hex');
        await user.save();
    
        const mail = {
          to: user.email,
          from: 'noreply@application.com',
          subject: 'Recuperação de senha',
          template: 'recover-password',
          context: {
            token: user.recoverToken,
          },
        };
        await this.mailerService.sendMail(mail);
      }
      
}