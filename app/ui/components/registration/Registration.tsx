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
import CheckBox from './checkbox/checkbox';
import styles from '../login/login.module.scss';
import style from './registration.module.scss';
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

  const [isChecked, setIsChecked] = useState(false);
  const onHandleChange = () => {
    setIsChecked(!isChecked);
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
        <div className={clsx(style.addressBox)}>
          <CheckBox
            isChecked={isChecked}
            label="Use the same address for billing and shipping"
            checkHandler={onHandleChange}
          />
          <div className={clsx(style.addressBoxInside)}>
            <div>
              <h3 className={clsx(style.addressTitle)}>Shipping Address</h3>
              <label
                htmlFor="streetShipping"
                className={clsx(styles.formElement)}
              >
                Street
                <input
                  id="streetShipping"
                  name="streetShipping"
                  type="textShipping"
                  value={street}
                  onChange={handleStreetChange}
                  className={clsx({ [styles.Error]: streetError })}
                />
              </label>
              <div className={clsx(styles.formError)}>
                {streetError && <span>{streetError}</span>}
              </div>
              <label
                htmlFor="cityShipping"
                className={clsx(styles.formElement)}
              >
                City
                <input
                  id="cityShipping"
                  name="cityShipping"
                  type="textShipping"
                  value={city}
                  onChange={handleCityChange}
                  className={clsx({ [styles.Error]: cityError })}
                />
              </label>
              <div className={clsx(styles.formError)}>
                {cityError && <span>{cityError}</span>}
              </div>
              <label
                htmlFor="codeShipping"
                className={clsx(styles.formElement)}
              >
                Postal code
                <input
                  id="codeShipping"
                  name="codeShipping"
                  type="textShipping"
                  value={code}
                  onChange={handleCodeChange}
                  className={clsx({ [styles.Error]: codeError })}
                />
              </label>
              <div className={clsx(styles.formError)}>
                {codeError && <span>{codeError}</span>}
              </div>
              <label
                htmlFor="countryShipping"
                className={clsx(styles.formElement)}
              >
                Country
                <select id="countryShipping" name="countryShipping">
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </label>
            </div>
            <div>
              <h3 className={clsx(style.addressTitle)}>Billing Address</h3>
              <label
                htmlFor="streetBilling"
                className={clsx(styles.formElement)}
              >
                Street
                <input
                  id="streetBilling"
                  name="streetBilling"
                  type="textBilling"
                  value={street}
                  onChange={handleStreetChange}
                  className={clsx(
                    { [styles.Error]: streetError },
                    { [style.disabled]: isChecked }
                  )}
                />
              </label>
              <div className={clsx(styles.formError)}>
                {streetError && <span>{streetError}</span>}
              </div>
              <label htmlFor="cityBilling" className={clsx(styles.formElement)}>
                City
                <input
                  id="cityBilling"
                  name="cityBilling"
                  type="textBilling"
                  value={city}
                  onChange={handleCityChange}
                  className={clsx(
                    { [styles.Error]: cityError },
                    { [style.disabled]: isChecked }
                  )}
                />
              </label>
              <div className={clsx(styles.formError)}>
                {cityError && <span>{cityError}</span>}
              </div>
              <label htmlFor="codeBilling" className={clsx(styles.formElement)}>
                Postal code
                <input
                  id="codeBilling"
                  name="codeBilling"
                  type="textBilling"
                  value={code}
                  onChange={handleCodeChange}
                  className={clsx(
                    { [styles.Error]: codeError },
                    { [style.disabled]: isChecked }
                  )}
                />
              </label>
              <div className={clsx(styles.formError)}>
                {codeError && <span>{codeError}</span>}
              </div>
              <label
                htmlFor="countryBilling"
                className={clsx(styles.formElement)}
              >
                Country
                <select
                  id="countryBilling"
                  name="countryBilling"
                  className={clsx({ [style.disabled]: isChecked })}
                >
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={clsx(styles.formButton)}
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
          Sign Up
        </button>
      </form>
    </section>
  );
}
