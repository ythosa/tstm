import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.singUp(authCredentialsDTO);
    }

    async singIn(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        return this.userRepository.validateUserPassword(authCredentialsDTO);
    }
}
