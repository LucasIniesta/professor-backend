import { Module } from '@nestjs/common';
import { ListProfessorClassesByFilterController } from './controllers/list-professor-classes-by-filter/list-professor-classes-by-filter.controller';
import { InfraModule } from '../../infra/infra.module';
import { ListStudentsFromClassByIdController } from './controllers/list-students-from-class-by-id/list-students-from-class-by-id.controller';
import { CheckClassStatusController } from './controllers/check-class-status/check-class-status.controller';
import { EvaluationStudentByIdController } from './controllers/update-students-status-by-evaluation/update-students-status-by-evaluation.controller';

@Module({
  controllers: [
    ListProfessorClassesByFilterController,
    ListStudentsFromClassByIdController,
    CheckClassStatusController,
    EvaluationStudentByIdController,
  ],
  imports: [InfraModule],
})
export class RestModule {}
