import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    // getTaskById(id: string): Task {
    //     const task = this.tasks.find(t => t.id === id);

    //     if (!task) {
    //         throw new NotFoundException(`Task with ID={${id}} not found`);
    //     }

    //     return task;
    // };

    // createTask(createTaskDTO: CreateTaskDTO): Task {
    //     const { title, description } = createTaskDTO;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // };

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
