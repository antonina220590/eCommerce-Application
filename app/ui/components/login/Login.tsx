'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import { isValidEmail, isValidPassword } from '@/app/utils/validation';
import styles from './login.module.scss';
import Show from '../../../../public/show.svg';
import Hide from '../../../../public/hide.svg';

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
    <section className={clsx(styles.form)}>
      <h2 className={clsx(styles.formTitle)}>Login Form</h2>
      <form className={clsx(styles.formForm)}>
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
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
          />{' '}
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <Hide /> : <Show />}
          </button>
        </label>
        <div className={clsx(styles.formError)}>
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
    </section>
  );
}
