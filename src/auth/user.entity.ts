import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async validatePassword(passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(passwordHash, this.password);
    }
}
