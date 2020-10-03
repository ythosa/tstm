import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.model";
import { Task } from "./task.entity";

@EntityRepository(Task) 
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');
        query.andWhere('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                'task.title LIKE :search OR task.description LIKE :search',
                { search: `%${search}%` },
            );
        }

        const tasks = query.getMany();
        
        return tasks;
    }

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDTO;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;

        return task;
    }
}
