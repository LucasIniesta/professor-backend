import { Body, Controller, Header, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { EvaluationResponseBody } from './update-students-status-by-evaluation.types';
import { EvaluationStudentUsecaseFactory } from '../../../../infra/factories/usecases/update-studants-status-by-evaluation.usecase.factory';
import { EvaluationStudentInput } from 'src/domain/usecases/evaluation-student-by-id/update-students-status-by-evaluation.types';

@Controller()
export class EvaluationStudentByIdController {
  constructor(private usecaseFactory: EvaluationStudentUsecaseFactory) {}

  @Post('students/:id/evaluation')
  @HttpCode(HttpStatus.OK)
  @Header('access-control-allow-origin', '*')
  async execute(
    @Param('id') studentId: string,
    @Body() body: { aulasLecionadas: number; aulasAtendidas: number; notaP1: number; notaP2: number },
  ): Promise<EvaluationResponseBody> {
    const { aulasLecionadas, aulasAtendidas, notaP1, notaP2 } = body;

    const evaluationInput: EvaluationStudentInput = {
      studentId,
      aulasLecionadas,
      aulasAtendidas,
      notaP1,
      notaP2,
    };
    const status = await this.usecaseFactory.getInstance().execute(evaluationInput);

    return status;
  }
}
