import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET } from 'src/config/server.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';


@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: {
                expiresIn: 1800,
            },
        }),
        TypeOrmModule.forFeature([
            UserRepository,
        ]),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        JwtStrategy,
        PassportModule,
    ],
})
export class AuthModule {}
