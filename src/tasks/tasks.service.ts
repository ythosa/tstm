import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor (
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {};

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // };

    // getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    //     const { status, search } = filterDTO;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(t => t.status === status);
    //     };

    //     if (search) {
    //         tasks = tasks.filter(t =>
    //             t.title.includes(search) ||
    //             t.description.includes(search)
    //         );
    //     };

    //     return tasks;
    // };

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID={${id}} not found`);
        }

        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    // updateTaskStatus(patch: PatchTaskStatusDTO): Task {
    //     const task = this.getTaskById(patch.id);
    //     const index = this.tasks.indexOf(task);

    //     this.tasks[index].status = patch.status;

    //     return this.tasks[index];
    // };

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);

    //     this.tasks = this.tasks.filter(t => t.id !== found.id);
    // };
}
