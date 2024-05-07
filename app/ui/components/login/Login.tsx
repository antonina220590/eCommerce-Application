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

  const isValidPassword = (pass: string): string => {
    if (!pass) {
      return 'Password is required';
    }
    if (pass.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(pass)) {
      return 'Password must contain at least one uppercase letter (A-Z)';
    }
    if (!/[a-z]/.test(pass)) {
      return 'Password must contain at least one lowercase letter (a-z)';
    }
    if (!/\d/.test(pass)) {
      return 'Password must contain at least one digit (0-9)';
    }
    if (!/[!@#$%^&*]/.test(pass)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    if (pass !== pass.trim()) {
      return 'Password must not contain leading or trailing whitespace';
    }
    return '';
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(isValidPassword(value));
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
        disabled={!isValidEmail(email) || isValidPassword(password) !== ''}
      >
        Log In
      </button>
    </form>
  );
}
