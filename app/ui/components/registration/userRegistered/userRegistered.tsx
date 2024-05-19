import React from 'react';
import { useRouter } from 'next/navigation';

type UserRegisteredProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserRegistered({
  setIsRegistered,
}: UserRegisteredProps) {
  const route = useRouter();
  const handleClick = () => {
    route.replace('/');
    setIsRegistered(false);
  };

  return (
    <div>
      USER REGISTERED
      <button type="button" onClick={handleClick}>
        x
      </button>
    </div>
  );
}
