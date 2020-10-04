import { User } from "../auth/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
export declare class TaskRepository extends Repository<Task> {
    private logger;
    getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]>;
    createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>;
}
