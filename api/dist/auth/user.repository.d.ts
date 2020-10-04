import { Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
export declare class UserRepository extends Repository<User> {
    singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>;
    validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string>;
    private hashPassword;
}
