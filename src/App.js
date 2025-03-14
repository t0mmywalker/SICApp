import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    grade: ''
  });

  // Haal de studenten op via het API endpoint.
  // Omdat Vercel de API routings regelt, gebruik je een relatieve URL.
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      const data = response.data;
      const studentArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setStudents(studentArray);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Voeg een student toe.
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/students', newStudent);
      alert('Student toegevoegd!');
      setNewStudent({ name: '', age: '', grade: '' });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Verwijder een student.
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Studentenbeheer</h1>
      </header>
      <form onSubmit={handleAddStudent}>
        <h2>Voeg een student toe</h2>
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

      <section>
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
      </section>
    </div>
  );
}

export default App;