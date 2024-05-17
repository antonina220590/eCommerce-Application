'use client';

import React, { useState, FormEvent } from 'react';
import {
  isValidText,
  isValidEmail,
  isValidPassword,
  isValidBirth,
  isValidStreet,
  isValidCode,
} from '@/app/utils/validation';
import handleRegistration from '@/app/utils/auth/handleRegistration';

export default function Registration() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birth, setBirth] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [code, setCode] = useState('');

  const [firstError, setFirstError] = useState('');
  const [lastError, setLastError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [birthError, setBirthError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [codeError, setCodeError] = useState('');

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

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setCode(value);
    setCodeError(isValidCode(value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleRegistration(e);
    // const result = await handleRegistration(e);
    // console.log(result);
    // console.log(e);
  };

  return (
    <section>
      <h4>
        Already have an account? <a href="/login">Sign In &rarr;</a>
      </h4>
      <form onSubmit={handleSubmit}>
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
              type="text"
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
          <div>
            <label htmlFor="code">
              Postal code
              <input
                id="code"
                name="code"
                type="text"
                value={code}
                onChange={handleCodeChange}
              />
            </label>
            {codeError && <span>{codeError}</span>}
          </div>
          <div>
            <label htmlFor="country">
              Country
              <select id="country" name="country">
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="UK">United Kingdom</option>
              </select>
            </label>
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
    </section>
  );
}
