import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EPERM } from 'constants';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.model';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

const mockUser = {
  id: 1,
  username: 'Test User',
};

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('some value');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filterDTO: GetTasksFilterDTO = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      const result = await tasksService.getTasks(filterDTO, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some value');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      const mockTask = {
        title: 'Test task',
        description: 'Test task descritption',
      };

      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById(1, mockUser);

      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as task is not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask() and returns the result', async () => {
      expect(taskRepository.createTask).not.toHaveBeenCalled();

      const createTaskDTO: CreateTaskDTO = {
        title: 'Test task',
        description: 'Test task descritption',
      };

      taskRepository.createTask.mockResolvedValue('super task');
      const result = await tasksService.createTask(createTaskDTO, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDTO,
        mockUser,
      );
      expect(result).toEqual('super task');
    });
  });

  describe('deleteTask', () => {
    it('calls taskRepository.delete() to delete a task', async () => {
      expect(taskRepository.createTask).not.toHaveBeenCalled();

      const mockDeletedObject = { affected: 1 };
      taskRepository.delete.mockResolvedValue(mockDeletedObject);

      await tasksService.deleteTask(1, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      });
    });

    it('throws an error as task could not be found', async () => {
      const mockDeletedObject = { affected: 0 };
      taskRepository.delete.mockResolvedValue(mockDeletedObject);

      expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTaskStatus', () => {
    it('calls taskRepository.update()', async () => {
      const mockTask = { id: 1, status: TaskStatus.OPEN };
      const mockTaskUpdate = { status: TaskStatus.DONE };

      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.updateTaskStatus(
        mockTask.id,
        mockTaskUpdate.status,
        mockUser,
      );
      expect(taskRepository.update).toHaveBeenCalledWith(mockTask.id, {
        ...mockTask,
        ...mockTaskUpdate,
      });
      expect(result).toEqual({ ...mockTask, ...mockTaskUpdate });
    });
  });
});
