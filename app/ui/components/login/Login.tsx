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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!/[a-z]/.test(value)) {
      setPasswordError(
        'Password must contain at least one lowercase letter (a-z)'
      );
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError(
        'Password must contain at least one uppercase letter (A-Z)'
      );
    } else if (!/\d/.test(value)) {
      setPasswordError('Password must contain at least one digit (0-9)');
    } else if (!/[@#$%^&*!]/.test(value)) {
      setPasswordError(
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      );
    } else if (value !== value.trim()) {
      setPasswordError(
        'Password must not contain leading or trailing whitespace'
      );
    } else {
      setPasswordError('');
    }
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
      <button type="submit" disabled={!isValidEmail(email) || !password}>
        Log In
      </button>
    </form>
  );
}
