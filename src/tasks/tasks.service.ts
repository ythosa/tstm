import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid }  from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { PatchTaskStatusDTO } from './dto/patch-task-status.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    };

    getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
        const { status, search } = filterDTO;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(t => t.status === status);
        };

        if (search) {
            tasks = tasks.filter(t =>
                t.title.includes(search) ||
                t.description.includes(search)
            );
        };

        return tasks;
    };

    getTaskById(id: string): Task {
        const task = this.tasks.find(t => t.id === id);

        if (!task) {
            throw new NotFoundException(`Task with ID={${id}} not found`);
        }

        return task;
    };

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    };

    updateTaskStatus(patch: PatchTaskStatusDTO): Task {
        const task = this.getTaskById(patch.id);
        const index = this.tasks.indexOf(task);

        this.tasks[index].status = patch.status;

        return this.tasks[index];
    };

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
    };
}
