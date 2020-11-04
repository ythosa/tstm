import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`Status={${value}} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    return this.allowedStatuses.includes(status);
  }
}
