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
        let addressPostfix = '';
        if (address.id === defaultShippingAddressId) {
          addressPostfix = 'Shipping';
        } else if (address.id === defaultBillingAddressId) {
          addressPostfix = 'Billing';
        }

        return (
          <div key={address.id} className={clsx(styles.formElement)}>
            {isDefaultShipping && <h3>Default Shipping Address</h3>}
            {isDefaultBilling && <h3>Default Billing Address</h3>}

            <input
              type="text"
              readOnly
              hidden
              name={`id${addressPostfix}`}
              value={address.id}
            />
            <label
              htmlFor={`street${addressPostfix}`}
              className={clsx(styles.formElement)}
            >
              Street*
              <input
                id={`street${addressPostfix}`}
                name={`street${addressPostfix}`}
                type="text"
                defaultValue={address.streetName}
              />
            </label>
            <label
              htmlFor={`code${addressPostfix}`}
              className={clsx(styles.formElement)}
            >
              Postal code*
              <input
                id={`code${addressPostfix}`}
                name={`code${addressPostfix}`}
                type="text"
                defaultValue={address.postalCode}
              />
            </label>
            <label
              htmlFor={`city${addressPostfix}`}
              className={clsx(styles.formElement)}
            >
              City*
              <input
                id={`city${addressPostfix}`}
                name={`city${addressPostfix}`}
                type="text"
                defaultValue={address.city}
              />
            </label>
            <label
              htmlFor={`country${addressPostfix}`}
              className={clsx(styles.formElement)}
            >
              Country*
              <input
                id={`country${addressPostfix}`}
                name={`country${addressPostfix}`}
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
