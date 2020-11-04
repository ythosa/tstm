import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing'; 
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
    findOne: jest.fn(),
});

describe('JwtStategy', () => {
    let jwtStrategy: JwtStrategy;
    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                { provide: UserRepository, useFactory: mockUserRepository },
            ],
        }).compile();

        jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
        userRepository = await module.get<UserRepository>(UserRepository);
    });


    describe('validate', () => {
        it('validates and returns the user based on JWT payload', async () => {
            const user = new User();
            user.username = 'test user';

            userRepository.findOne.mockResolvedValue(user);

            const result = await jwtStrategy.validate({ username: user.username });
            expect(userRepository.findOne).toHaveBeenCalledWith({ username: user.username });
            expect(result).toEqual(user);
        });

        it('throws an unauthorized exception as user cannot be found', async () => {
            userRepository.findOne.mockResolvedValue(undefined);

            expect(jwtStrategy.validate({ username: 'Yasoska' }))
                .rejects.toThrow(UnauthorizedException);
        });
    });
});
