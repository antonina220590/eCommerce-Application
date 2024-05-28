'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import getUserInfo from '@/app/utils/user/getUserInfo';
import { Customer } from '@commercetools/platform-sdk';
import styles from '../login/login.module.scss';

export default function UserInfo() {
  const [userData, setUserData] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser = await getUserInfo();
      setUserData(fetchedUser.userData);
    };
    fetchUserData().catch(console.error);
  }, []);
  // console.log('userData', userData);

  const handleSubmit = () => {
    // console.log('submitted');
  };

  return (
    <section className={clsx(styles.form)}>
      {userData && (
        <form className={clsx(styles.formForm)} onSubmit={handleSubmit}>
          <h2>User Information</h2>
          <label htmlFor="firstName" className={clsx(styles.formElement)}>
            First name*
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={userData.firstName}
            />
          </label>
          <label htmlFor="firstName" className={clsx(styles.formElement)}>
            Last name*
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={userData.lastName}
            />
          </label>
          <label htmlFor="dateOfBirth" className={clsx(styles.formElement)}>
            Date of birth*
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={userData.dateOfBirth}
            />
          </label>
          <h2>User Addresses</h2>
        </form>
      )}

      {/* {JSON.stringify(userData)} */}
    </section>
  );
}
