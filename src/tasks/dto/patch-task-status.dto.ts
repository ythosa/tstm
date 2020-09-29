import { TaskStatus } from "../task-status.model";

export class PatchTaskStatusDTO {
    id: string;
    status: TaskStatus;
}