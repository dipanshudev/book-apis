import StudentsController from "@controllers/StudentsController";
import { Router } from "express";

const studentRoute = Router();


// Add a new student with result
studentRoute.post('/', StudentsController.addStudent);

// Get all students with optional result filter
studentRoute.get('/', StudentsController.getAllStudents);

export default studentRoute;