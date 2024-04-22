import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// imports
import { sendApiResponse } from '@utils/responseHandler';
import { StudentService } from '@services/StudentService';

class StudentsController {
  async addStudent(req: Request, res: Response): Promise<void> {
    try {
      // Extract data from the request body
      const { name, result } = req.body;
      // Call the service to add a new student with result
      const newStudent = await StudentService.addStudent(name, result);
      sendApiResponse(res, StatusCodes.CREATED, { data: newStudent }, 'Added successfully');
    } catch (error) {
      console.error(error);
      sendApiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined, 'Server error', 'Internal server error');
    }
  };

  // Get all students with optional result filter
  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      // Extract the result filter from query parameters
      const result = req.query.result as string;

      // Call the service to get all students with optional result filter
      const students = await StudentService.getAllStudents(result);

      sendApiResponse(res, StatusCodes.CREATED, { data: students }, 'Added successfully');
    } catch (error) {
      console.error(error);
      sendApiResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, undefined, 'Server error', 'Internal server error');
    }
  }
}

export default new StudentsController();
