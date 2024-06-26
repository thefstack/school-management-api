const express = require('express');
const router = express.Router();
const studentModel = require('../models/studentModel');

const student_attendance=require("./student_attendanceRoute");
const {authenticateToken}=require("../middleware/authToken")
router.use("/attendance",student_attendance)

router.post('/', authenticateToken, async (req, res) => {
  try {
    const studentId = await studentModel.createStudent(req.body);
    res.status(201).json({ id: studentId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});

router.get('/',authenticateToken, async (req, res) => {
  try {
    const student = await studentModel.getStudents();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get students' });
  }
});

router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const student = await studentModel.getStudentById(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get student' });
  }
});

router.put('/:id',authenticateToken, async (req, res) => {
    const studentId = req.params.id;
    const updateData = req.body;
  
    try {
      const result = await studentModel.updateStudent(studentId, updateData);
      res.json({ message: 'Student updated successfully', result });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Error updating student', error });
    }
});

router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const affectedRows = await studentModel.deleteStudent(req.params.id);
    if (affectedRows > 0) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

module.exports = router;
