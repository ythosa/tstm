import { TaskStatus } from "../task.model";

export class PatchTaskStatusDTO {
    id: string;
    status: TaskStatus;
}