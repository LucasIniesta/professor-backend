import { EvaluationResponseBody } from 'src/app/rest/controllers/update-students-status-by-evaluation/update-students-status-by-evaluation.types';
import { EvaluationStudentInput as EvaluationStudentInput } from './update-students-status-by-evaluation.types';
import { UpdateStudentStatusPort } from '../../ports/update-student-status.port';

export class EvaluationStudentUsecase {
  constructor(private readonly updateStudentStatusPort: UpdateStudentStatusPort) {}

  async execute({
    studentId,
    aulasLecionadas,
    aulasAtendidas,
    notaP1,
    notaP2,
  }: EvaluationStudentInput): Promise<EvaluationResponseBody> {
    const media = (notaP1 + notaP2) / 2;
    const frequencia = (aulasAtendidas / aulasLecionadas) * 100;

    let status = 'NAO_AVALIADO';

    if (media >= 7.0 && frequencia >= 75) {
      status = 'APROVADO';
    } else if ((media >= 5.0 && media <= 6.9) || frequencia < 75) {
      status = 'EM_EXAME';
    } else {
      status = 'REPROVADO';
    }

    console.log('Status calculado:', status);
    await this.updateStudentStatusPort.execute({ studentId, newStatus: status });
    console.log('Status atualizado no banco com sucesso');

    return { status };
  }
}
