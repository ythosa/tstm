import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {};

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[] {
    //     if (Object.keys(filterDTO).length) {
    //         return this.tasksService.getTasksWithFilters(filterDTO);
    //     }

    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     this.tasksService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // ): Task {
    //     const patchTaskStatusDTO: PatchTaskStatusDTO = {
    //         id,
    //         status,
    //     };

    //     return this.tasksService.updateTaskStatus(patchTaskStatusDTO);
    // }
}
