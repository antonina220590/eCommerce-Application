'use client';

import React from 'react';
import clsx from 'clsx';
import { Customer, Address } from '@commercetools/platform-sdk';
import styles from '../login/login.module.scss';

interface UserAddressProps {
  user: Customer;
}

function UserAddress({ user }: UserAddressProps) {
  const { addresses, defaultShippingAddressId, defaultBillingAddressId } = user;
  // console.log(addresses);
  // console.log(defaultShippingAddressId);
  // console.log(defaultBillingAddressId);

  return (
    <>
      {addresses.map((address: Address) => {
        const isDefaultShipping = address.id === defaultShippingAddressId;
        const isDefaultBilling = address.id === defaultBillingAddressId;

        return (
          <div key={address.id} className={clsx(styles.formElement)}>
            {isDefaultShipping && <h3>Default Shipping Address</h3>}
            {isDefaultBilling && <h3>Default Billing Address</h3>}
            <label
              htmlFor={`streetName-${address.id}`}
              className={clsx(styles.formElement)}
            >
              Street*
              <input
                id={`streetName-${address.id}`}
                name={`streetName-${address.id}`}
                type="text"
                defaultValue={address.streetName}
              />
            </label>

            <label
              htmlFor={`postalCode-${address.id}`}
              className={clsx(styles.formElement)}
            >
              Postal code*
              <input
                id={`postalCode-${address.id}`}
                name={`postalCode-${address.id}`}
                type="text"
                defaultValue={address.postalCode}
              />
            </label>

            <label
              htmlFor={`city-${address.id}`}
              className={clsx(styles.formElement)}
            >
              City*
              <input
                id={`city-${address.id}`}
                name={`city-${address.id}`}
                type="text"
                defaultValue={address.city}
              />
            </label>

            <label
              htmlFor={`country-${address.id}`}
              className={clsx(styles.formElement)}
            >
              Country*
              <input
                id={`country-${address.id}`}
                name={`country-${address.id}`}
                type="text"
                defaultValue={address.country}
              />
            </label>
          </div>
        );
      })}
    </>
  );
}

export default UserAddress;
