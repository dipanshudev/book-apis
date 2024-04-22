import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';
import StudentResultModel from './studentResultModel';

class StudentModel extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define the one-to-one relationship with StudentResultModel
  public result?: StudentResultModel;
}

StudentModel.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'students',
  }
);

StudentModel.hasOne(StudentResultModel, { foreignKey: 'student_id', as: 'result', });
StudentResultModel.belongsTo(StudentModel, { foreignKey: 'student_id', as: 'student'});

export default StudentModel;
