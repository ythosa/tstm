import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDTO;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        
        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists');
            }

            throw new InternalServerErrorException();
        } 
    }

    async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const { username, password } = authCredentialsDTO;

        const user = await this.findOne({ username });

        if (!(user && await user.validatePassword(password))) {
            throw new UnauthorizedException("Invalid username or password");
        }

        return user.username;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
