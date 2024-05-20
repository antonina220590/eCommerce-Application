import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import styles from '../registration.module.scss';

type UserRegisteredProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserRegistered({
  setIsRegistered,
}: UserRegisteredProps) {
  const route = useRouter();

  setTimeout(() => {
    // window.location.href = '/';
    route.replace('/');
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
