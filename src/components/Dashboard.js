import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '' });

  // Haal de studenten op van de backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students'); // Gebruik relatieve URL voor deployment
      const data = response.data;
      const studentArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setStudents(studentArray);
    } catch (error) {
      console.error('Fout bij ophalen van studenten:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Voeg een nieuwe student toe via de backend
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/students', newStudent);
      alert('Student toegevoegd!');
      setNewStudent({ name: '', age: '', grade: '' });
      fetchStudents();
    } catch (error) {
      console.error('Fout bij toevoegen van student:', error);
    }
  };

  // Verwijder een student via de backend
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Fout bij verwijderen van student:', error);
    }
  };

  return (
    <div className="dashboardContainer">
      <header className="dashboardHeader">
        <h1>Welcome to the Dashboard!</h1>
        <p>Je bent nu ingelogd.</p>
      </header>

      <section className="studentManagement">
        <h2>Studentenbeheer</h2>
        <form onSubmit={handleAddStudent}>
          <div className="form-group">
            <label>Naam:</label>
            <input
              type="text"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Leeftijd:</label>
            <input
              type="number"
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Cijfer:</label>
            <input
              type="text"
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              required
            />
          </div>
          <button type="submit">Voeg Student toe</button>
        </form>

        <div className="studentList">
          <h2>Studentenlijst</h2>
          <button onClick={fetchStudents}>Laad Studenten</button>
          {students.length === 0 ? (
            <p>Geen studenten gevonden.</p>
          ) : (
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  {student.name} - {student.age} jaar - Cijfer: {student.grade}
                  <button onClick={() => handleDeleteStudent(student.id)}>Verwijder</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;