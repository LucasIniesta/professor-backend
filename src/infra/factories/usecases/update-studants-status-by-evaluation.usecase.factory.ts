import { Injectable } from '@nestjs/common';
import { EvaluationStudentUsecase } from '../../../domain/usecases/evaluation-student-by-id/update-students-status-by-evaluation-usecase';
import { UpdateStudentStatusPortFactory } from '../ports/update-studant-status.port.factory';

@Injectable()
export class EvaluationStudentUsecaseFactory {
  constructor(private readonly updateStudentStatusPortFactory: UpdateStudentStatusPortFactory) {}

  getInstance(): EvaluationStudentUsecase {
    const updateStudentStatusPort = this.updateStudentStatusPortFactory.getInstance();
    return new EvaluationStudentUsecase(updateStudentStatusPort);
  }
}
