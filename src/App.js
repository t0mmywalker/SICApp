import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [students, setStudents] = useState([]);

  // Student toevoegen
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5002/api/students', {
        name,
        age,
        grade,
      });

      alert('Student toegevoegd!');
      setName('');
      setAge('');
      setGrade('');
      fetchStudents(); // Refresh de lijst
    } catch (error) {
      console.error('Fout bij toevoegen van student:', error);
    }
  };

  // Studenten ophalen
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/students');
      setStudents(Object.values(response.data || {})); // Omzetten naar array
    } catch (error) {
      console.error('Fout bij ophalen van studenten:', error);
    }
  };

  return (
    <div className="App">
      <h1>Voeg een student toe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Naam:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Leeftijd:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cijfer:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <button type="submit">Voeg Student toe</button>
      </form>

      <h2>Studentenlijst</h2>
      <button onClick={fetchStudents}>Laad Studenten</button>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student.name} - Leeftijd: {student.age} - Cijfer: {student.grade}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;