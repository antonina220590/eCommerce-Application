import React from 'react';
import clsx from 'clsx';
import styles from '../registration.module.scss';

type UserRegisteredProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserRegistered({
  setIsRegistered,
}: UserRegisteredProps) {
  setTimeout(() => {
    window.location.href = '/';
    setIsRegistered(false);
  }, 4000);

  return (
    <div className={clsx(styles.messageBox)}>
      <p className={clsx(styles.messageText)}>
        You are successfully registered!
      </p>
    </div>
  );
}
