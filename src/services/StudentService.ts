import StudentModel from "@models/studentModel";
import StudentResultModel from "@models/studentResultModel";
import { Sequelize } from "sequelize";

export class StudentService {
  // Add a new student with result
  static async addStudent(name: string, result: string): Promise<any> {
    // Use a transaction to ensure data consistency
    const transaction = await  (StudentModel.sequelize as Sequelize).transaction();

    try {
      // Create a new student
      const newStudent = await StudentModel.create({ name }, { transaction });

      // Create a corresponding result record
      await StudentResultModel.create({ result, student_id: newStudent.id }, { transaction });

      // Commit the transaction
      await transaction.commit();

      return newStudent.toJSON();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  }

  // Get all students with optional result filter
  static async getAllStudents(result?: string): Promise<any[]> {
    // Use Sequelize include to retrieve associated result data
    const students = await StudentModel.findAll({
      include: [
        {
          model: StudentResultModel,
          as: 'result',
          where: result ? { result } : {},
        },
      ],
    });

    return students.map((student) => student.toJSON());
  }
}
