// src/components/SignIn.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // TODO: Inloglogica
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="signInContainer">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn} className="signInForm">
        <input type="text" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <button className="linkBtn" onClick={handleForgotPassword}>
        Forgot Password?
      </button>
    </div>
  );
}

export default SignIn;