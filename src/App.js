// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="AppContainer">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;