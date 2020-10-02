import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt' 
        }),
        JwtModule.register({
            secret: 'ilovetan9',
            signOptions: {
                expiresIn: 1800,
            },
        }),
        TypeOrmModule.forFeature([ UserRepository ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
