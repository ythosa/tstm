import { Test } from "@nestjs/testing";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";
import { UserRepository } from "./user.repository";

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
        it('1', () => expect(true).toEqual(true))
    })
});
