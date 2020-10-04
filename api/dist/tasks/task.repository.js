"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const task_status_model_1 = require("./task-status.model");
const task_entity_1 = require("./task.entity");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('TaskRepository');
    }
    async getTasks(filterDTO, user) {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');
        query.andWhere('task.userId = :userId', { userId: user.id });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDTO)}.
                \rStack: ${error.stack}.`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createTask(createTaskDTO, user) {
        const { title, description } = createTaskDTO;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = task_status_model_1.TaskStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        }
        catch (error) {
            this.logger.error(`Failed to create a task for user "${user.username}". Data: ${JSON.stringify(createTaskDTO)}.
                \rStack: ${error.stack}.`);
            throw new common_1.InternalServerErrorException();
        }
        delete task.user;
        return task;
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map