'use client';

import React, { useState } from 'react';
import {
  isValidText,
  isValidEmail,
  isValidPassword,
  isValidBirth,
  isValidStreet,
} from '@/app/utils/validation';

export default function Registration() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [firstError, setFirstError] = useState('');
  const [lastError, setLastError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [birthError, setBirthError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setFirst(value);
    setFirstError(isValidText(value));
  };

  const handleLastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setLast(value);
    setLastError(isValidText(value));
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

  const handleBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBirth(value);
    setBirthError(isValidBirth(value));
  };

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setStreet(value);
    setStreetError(isValidStreet(value));
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setCity(value);
    setCityError(isValidText(value));
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
      <div>
        <label htmlFor="birth">
          Date of birth
          <input
            id="birth"
            name="birth"
            type="date"
            value={birth}
            onChange={handleBirthChange}
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
        {birthError && <span>{birthError}</span>}
      </div>
      <h3>Address</h3>
      {/* This part of form will repeat for billing address task RSS-ECOMM-2_14, should be reused  */}
      <div>
        <div>
          <label htmlFor="street">
            Street
            <input
              id="street"
              name="street"
              type="text"
              value={street}
              onChange={handleStreetChange}
            />
          </label>
          {streetError && <span>{streetError}</span>}
        </div>
        <div>
          <label htmlFor="city">
            City
            <input
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={handleCityChange}
            />
          </label>
          {cityError && <span>{cityError}</span>}
        </div>
      </div>
      <button
        type="submit"
        disabled={
          isValidEmail(email) !== '' ||
          isValidPassword(password) !== '' ||
          isValidText(first) !== '' ||
          isValidText(last) !== '' ||
          isValidBirth(birth) !== '' ||
          isValidStreet(birth) !== '' ||
          isValidText(city) !== ''
        }
      >
        Log In
      </button>
    </form>
  );
}
