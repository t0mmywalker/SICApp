// src/components/ForgotPassword.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();
    alert('Reset code sent!');
  };

  return (
    <div className="forgotContainer">
      <h1>Reset Password</h1>
      <form onSubmit={handleSendCode} className="forgotForm">
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Send Code</button>
      </form>
      <button className="linkBtn" onClick={() => navigate('/')}>
        Back to Sign In
      </button>
    </div>
  );
}

export default ForgotPassword;