const pool=require("../db/conn");

const createStudent = async (student) => {
  const sql = 'INSERT INTO students (name, dob, gender,  father_name, mother_name, guardian_name, phone1, phone2, religion, category, village, pincode, landmark, aadhar, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    student.name,
    student.dob,
    student.gender,
    student.father_name,
    student.mother_name,
    student.guardian_name,
    student.phone1,
    student.phone2,
    student.religion,
    student.category,
    student.village,
    student.pincode,
    student.landmark,
    student.aadhar,
    student.email
  ];
  
  try {
    const [result] = await pool.execute(sql, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const getStudents = async () => {
  const sql = 'SELECT * FROM students';
  try {
    const [rows] = await pool.execute(sql);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getStudentById = async (id) => {
  const sql = 'SELECT * FROM students WHERE id = ?';
  try {
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const updateStudent = async (id, updateData) => {
    try {
        // Object.keys retrive array of keys from updateData, map() iterates over each key in array and transform it, join is used to concatenate with separator
        const setClause = Object.keys(updateData)
          .map((key) => `${key} = ?`)
          .join(', ');
    
        const values = Object.values(updateData);
    
        // Append the id at the end of the values array
        values.push(id);
    
        const sql = `UPDATE students SET ${setClause} WHERE id = ?`;
    
        const [result] = await pool.execute(sql, values);
    
        console.log(`Updated student with id ${id}`);
        return result;
      } catch (error) {
        console.error('Error updating student:', error);
        throw error;
      }
};

const deleteStudent = async (id) => {
  const sql = 'DELETE FROM students WHERE id = ?';
  try {
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
