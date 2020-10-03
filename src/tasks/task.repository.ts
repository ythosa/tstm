import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.model";
import { Task } from "./task.entity";


@EntityRepository(Task) 
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');

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

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(
                `Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDTO)}.
                \rStack: ${error.stack}.`,
            );
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDTO;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {
            await task.save();
        } catch (error) {
            this.logger.error(
                `Failed to create a task for user "${user.username}". Data: ${JSON.stringify(createTaskDTO)}.
                \rStack: ${error.stack}.`,
            );
            throw new InternalServerErrorException();
        }

        delete task.user;
        return task;
    }
}
