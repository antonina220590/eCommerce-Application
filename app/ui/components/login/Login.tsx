'use client';

import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValidEmail = (mail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setEmail(value);
    if (!value) {
      setEmailError('Email is required');
    } else if (!isValidEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const isValidPassword = (pass: string) => {
    let message = '';
    if (!pass) {
      message = 'Password is required';
    } else if (pass.length < 8) {
      message = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(pass)) {
      message = 'Password must contain at least one uppercase letter (A-Z)';
    } else if (!/[a-z]/.test(pass)) {
      message = 'Password must contain at least one lowercase letter (a-z)';
    } else if (!/\d/.test(pass)) {
      message = 'Password must contain at least one digit (0-9)';
    } else if (!/[@#$%^&*]/.test(pass)) {
      message = 'Password must contain at least one special character';
    } else if (pass !== pass.trim()) {
      message = 'Password must not contain leading or trailing whitespace';
    }
    return message;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    const errorMessage = isValidPassword(value);
    setPasswordError(errorMessage);
  };

  return (
    <form>
      <div>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="user@example.com"
          />
        </label>
        {emailError && <span>{emailError}</span>}
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {passwordError && <span>{passwordError}</span>}
      </div>
      <button
        type="submit"
        disabled={!isValidEmail(email) || !isValidPassword(password)}
      >
        Log In
      </button>
    </form>
  );
}
