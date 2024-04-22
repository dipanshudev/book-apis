import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import StudentModel from './studentModel';

class StudentResultModel extends Model {
  public id!: number;
  public result!: 'pass' | 'fail';
  public student_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define the association with StudentModel
  public student?: StudentModel;
}

StudentResultModel.init(
  {
    result: {
      type: DataTypes.ENUM('pass', 'fail'),
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'student_results',
  }
);


export default StudentResultModel;
