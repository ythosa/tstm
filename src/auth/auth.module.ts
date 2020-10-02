import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtSecret } from 'src/config/jwt-secret.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt' 
        }),
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {
                expiresIn: 1800,
            },
        }),
        TypeOrmModule.forFeature([ 
            UserRepository
        ]),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        JwtStrategy,
        PassportModule,
    ]
})
export class AuthModule {}
