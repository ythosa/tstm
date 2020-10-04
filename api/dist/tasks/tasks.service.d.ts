import { User } from '../auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.model';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]>;
    getTaskById(id: number, user: User): Promise<Task>;
    createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>;
    updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
}
