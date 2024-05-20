import React from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from '../registration.module.scss';

type UserRegisteredProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserRegistered({
  setIsRegistered,
}: UserRegisteredProps) {
  const route = useRouter();

  setTimeout(() => {
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
