'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import clsx from 'clsx';
import getUserInfo from '@/app/utils/user/getUserInfo';
import { Customer } from '@commercetools/platform-sdk';
import handleUserUpdate from '@/app/utils/auth/handleUserUpdate';
import styles from '../login/login.module.scss';
import UserAddress from './UserAddress';
import Checkbox from '../registration/checkbox/checkbox';

export default function UserInfo() {
  const [userData, setUserData] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser = await getUserInfo();
      setUserData(fetchedUser.userData as Customer);
    };
    fetchUserData().catch(console.error);
  }, []);
  // console.log('userData', userData);

  const handleEditChange = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await handleUserUpdate(e);
    console.log(result);
    // if (result?.success) {
    //   console.log('result', result?.success);
    // }
    // console.log(e);
  };

  return (
    <section className={clsx(styles.form)}>
      {userData && (
        <>
          <Checkbox
            id="editForm"
            name="editForm"
            label="Edit Mode"
            isChecked={isEditing}
            checkHandler={handleEditChange}
          />
          <form
            className={clsx(styles.formForm, {
              [styles.formDisabled]: !isEditing,
            })}
            onSubmit={handleSubmit}
          >
            <h2>User Information</h2>
            <label htmlFor="firstName" className={clsx(styles.formElement)}>
              First name*
              <input
                id="firstName"
                name="firstName"
                type="text"
                defaultValue={userData.firstName}
              />
            </label>
            <label htmlFor="firstName" className={clsx(styles.formElement)}>
              Last name*
              <input
                id="lastName"
                name="lastName"
                type="text"
                defaultValue={userData.lastName}
              />
            </label>
            <label htmlFor="dateOfBirth" className={clsx(styles.formElement)}>
              Date of birth*
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                defaultValue={userData.dateOfBirth}
              />
            </label>
            <h2>User Addresses</h2>
            <UserAddress user={userData} />
            {isEditing && (
              <button type="submit" className={clsx(styles.formButton)}>
                Save Info
              </button>
            )}
          </form>
        </>
      )}

      {/* {JSON.stringify(userData)} */}
    </section>
  );
}
