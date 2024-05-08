'use client';

import React, { useState } from 'react';
import { isValidEmail, isValidPassword } from '@/app/utils/validation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
          isValidEmail(email) !== '' || isValidPassword(password) !== ''
        }
      >
        Log In
      </button>
    </form>
  );
}
