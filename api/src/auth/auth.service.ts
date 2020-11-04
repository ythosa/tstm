import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.inteface';
import { UserRepository } from './user.repository';


@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.signUp(authCredentialsDTO);
    }

    async singIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDTO);

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

        return { accessToken };
    }
}
