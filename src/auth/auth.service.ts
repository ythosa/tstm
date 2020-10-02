import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.inteface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.singUp(authCredentialsDTO);
    }

    async singIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDTO);

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
