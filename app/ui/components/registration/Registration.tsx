'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import {
  isValidText,
  isValidEmail,
  isValidPassword,
  isValidBirth,
  isValidStreet,
  isValidCode,
} from '@/app/utils/validation';
import styles from '../login/login.module.scss';
import Show from '../../../../public/show.svg';
import Hide from '../../../../public/hide.svg';

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

  return (
    <section className={clsx(styles.form)}>
      <h2 className={clsx(styles.formTitle)}>Registration Form</h2>
      <h4 className={clsx(styles.formSubtitle)}>
        Already have an account? <a href="/login">Sign In &rarr;</a>
      </h4>
      <form className={clsx(styles.formForm)}>
        <label htmlFor="first" className={clsx(styles.formElement)}>
          First name
          <input
            id="first"
            name="first"
            type="text"
            value={first}
            onChange={handleFirstChange}
            className={clsx({ [styles.Error]: firstError })}
          />
        </label>
        <div className={clsx(styles.formError)}>
          {firstError && <span>{firstError}</span>}
        </div>
        <label htmlFor="last" className={clsx(styles.formElement)}>
          Last name
          <input
            id="last"
            name="last"
            type="text"
            value={last}
            onChange={handleLastChange}
            className={clsx({ [styles.Error]: lastError })}
          />
        </label>
        <div className={clsx(styles.formError)}>
          {lastError && <span>{lastError}</span>}
        </div>
        <label htmlFor="email" className={clsx(styles.formElement)}>
          Email
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="user@example.com"
            className={clsx({ [styles.Error]: emailError })}
          />
        </label>
        <div className={clsx(styles.formError)}>
          {emailError && <span>{emailError}</span>}
        </div>
        <label htmlFor="password" className={clsx(styles.formElement)}>
          Password
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className={clsx({ [styles.Error]: passwordError })}
            />{' '}
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <Show /> : <Hide />}
            </button>
          </div>
        </label>
        <div className={clsx(styles.formError)}>
          {passwordError && <span>{passwordError}</span>}
        </div>
        <label htmlFor="birth" className={clsx(styles.formElement)}>
          Date of birth
          <input
            id="birth"
            name="birth"
            type="date"
            value={birth}
            onChange={handleBirthChange}
            className={clsx({ [styles.Error]: birthError })}
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
        <div className={clsx(styles.formError)}>
          {birthError && <span>{birthError}</span>}
        </div>
        <h3>Address</h3>
        <div>
          <div>
            <label htmlFor="street" className={clsx(styles.formElement)}>
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
            <label htmlFor="city" className={clsx(styles.formElement)}>
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
            <label htmlFor="code" className={clsx(styles.formElement)}>
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
            <label htmlFor="country" className={clsx(styles.formElement)}>
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
