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

  return (
    <>
      {addresses.map((address: Address, index: number) => {
        const isDefaultShipping = address.id === defaultShippingAddressId;
        const isDefaultBilling = address.id === defaultBillingAddressId;
        let addressPostfix = '';

        if (defaultShippingAddressId && defaultBillingAddressId) {
          if (isDefaultShipping) {
            addressPostfix = 'Shipping';
          } else if (isDefaultBilling) {
            addressPostfix = 'Billing';
          }
        } else if (index === 0) {
          addressPostfix = 'Shipping';
        } else if (index === 1) {
          addressPostfix = 'Billing';
        }

        return (
          <div
            key={address.id}
            className={clsx(styles.formUserAddress, styles.formElement)}
          >
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
