"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const task_status_model_1 = require("../task-status.model");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            task_status_model_1.TaskStatus.OPEN,
            task_status_model_1.TaskStatus.IN_PROGRESS,
            task_status_model_1.TaskStatus.DONE,
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`Status={${value}} is an invalid status`);
        }
        return value;
    }
    isStatusValid(status) {
        return this.allowedStatuses.includes(status);
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map