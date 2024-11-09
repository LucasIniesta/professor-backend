import { Model } from 'mongoose';
import {
  ListStudentsFromClassByIdPort,
  ListStudentsFromClassByIdPortInput,
  ListStudentsFromClassByIdPortResult,
} from '../../../domain/ports/list-students-from-class-by-id.port';
import { StudentDocument } from '../../schemas/student.shema';

export class ListStudentsFromClassByIdMongooseAdapter implements ListStudentsFromClassByIdPort {
  constructor(private readonly StudentModel: Model<StudentDocument>) {}

  async execute({ classId }: ListStudentsFromClassByIdPortInput): Promise<ListStudentsFromClassByIdPortResult> {
    const students = (await this.StudentModel.find<StudentDocument>({ classCodeList: { $in: [classId] } })
      .lean()
      .exec()) as StudentDocument[];

    return this.mapStudentsToModel(students);
  }

  private mapStudentsToModel(studentDocumentList: StudentDocument[]): ListStudentsFromClassByIdPortResult {
    return studentDocumentList.map((student) => ({
      name: student.name,
      id: student._id.toString(),
      status: student.status,
      classCodeList: student.classCodeList,
    }));
  }
}
