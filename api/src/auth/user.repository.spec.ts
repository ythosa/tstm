import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";

const mockCredentialsDTO = {
    username: 'ythosa',
    password: 'password',
}

describe('UserRepository', () => {
    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserRepository,
            ],
        }).compile();

        userRepository = await module.get<UserRepository>(UserRepository);
    });

    describe('signUp', () => {
        let save;

        beforeEach(() => {
            save = jest.fn();
            userRepository.create = jest.fn().mockReturnValue({ save });
        })

        it('successfully signs up the user', () => {
            save.mockResolvedValue(undefined);
            expect(userRepository.signUp(mockCredentialsDTO)).resolves.not.toThrow();
        });

        // it('throws a conflict exception as user already exists', () => {
        //     save.mockRejectedValue({ code: '23505' });
        //     expect(userRepository.signUp(mockCredentialsDTO)).rejects.toThrow(ConflictException);
        // });

        // it('throws a internal server error', () => {
        //     save.mockRejectedValue({ code: '11111' });
        //     expect(userRepository.signUp(mockCredentialsDTO)).rejects.toThrow(InternalServerErrorException);
        // });
    });

    describe('validateUserPassword', () => {
        let user;

        beforeEach(() => {
            userRepository.findOne = jest.fn();

            user = new User();
            user.username = 'TestUsername';
            user.validatePassword = jest.fn();
        })

        it('returns the username as validation is successful', async () => {
            userRepository.findOne.mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(true);

            const result = await userRepository.validateUserPassword(mockCredentialsDTO);
            expect(result).toEqual(user.username);
        });

        it('returns null as user cannot be found', async () => {
            userRepository.findOne.mockResolvedValue(undefined);
            user.validatePassword.mockResolvedValue(true);

            expect(userRepository.validateUserPassword(mockCredentialsDTO))
                .rejects.toThrow(UnauthorizedException);
        });

        it('returns null as password is invalid', () => {
            userRepository.findOne.mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(false);

            expect(userRepository.validateUserPassword(mockCredentialsDTO))
                .rejects.toThrow(UnauthorizedException);
        });
    });

    describe('hashPassword', () => {
        it('calls bcrypt.hash to generate a hash', async () => {
            bcrypt.hash = jest.fn().mockResolvedValue('testHash');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await userRepository.hashPassword('pass', 'salt');
            expect(bcrypt.hash).toHaveBeenCalledWith('pass', 'salt');
        });
    });
});
