import { User } from "../auth/user.entity";
import { BaseEntity } from "typeorm";
import { TaskStatus } from "./task-status.model";
export declare class Task extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
    userId: number;
}
