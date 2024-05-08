'use client';

import React, { useState } from 'react';
import {
  isValidName,
  isValidEmail,
  isValidPassword,
} from '@/app/utils/validation';

export default function Registration() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstError, setFirstError] = useState('');
  const [lastError, setLastError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setFirst(value);
    setFirstError(isValidName(value));
  };

  const handleLastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setLast(value);
    setLastError(isValidName(value));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setEmail(value);
    setEmailError(isValidEmail(value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(isValidPassword(value));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form>
      <div>
        <label htmlFor="first">
          First name
          <input
            id="first"
            name="first"
            type="text"
            value={first}
            onChange={handleFirstChange}
          />
        </label>
        {firstError && <span>{firstError}</span>}
      </div>
      <div>
        <label htmlFor="last">
          Last name
          <input
            id="last"
            name="last"
            type="text"
            value={last}
            onChange={handleLastChange}
          />
        </label>
        {lastError && <span>{lastError}</span>}
      </div>
      <div>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
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
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {passwordError && <span>{passwordError}</span>}
      </div>
      <button
        type="submit"
        disabled={
          isValidEmail(email) !== '' ||
          isValidPassword(password) !== '' ||
          isValidName(first) !== '' ||
          isValidName(last) !== ''
        }
      >
        Log In
      </button>
    </form>
  );
}
