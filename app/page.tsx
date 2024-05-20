'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import UserRegistered from '@/app/ui/components/registration/userRegistered/userRegistered';
import styles from './mainPage.module.scss';
import MainLinks from './ui/components/headerComponent/links/mainLinks/main-links';

export default function Home() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setIsRegistered(true);
    }
  }, []);

  return (
    <main className={clsx(styles.main)}>
      <section className={styles.mainLinks}>
        <div className={styles.mainLinksWrapper}>
          <MainLinks />
        </div>
      </section>
      <div className={clsx(styles.message)}>
        {isRegistered && <UserRegistered setIsRegistered={setIsRegistered} />}
      </div>
      <section className={clsx(styles.mainAbout)}>
        <div className={clsx(styles.mainAboutBox)}>
          <h2 className={clsx(styles.mainAboutTitle)}>
            WELCOME TO YOUR HAPPY PLACE.
          </h2>
          <p className={clsx(styles.mainAboutText)}>
            Shop brand new books at least 50% off* list prices every day.
          </p>
          <Link className={clsx(styles.mainAboutBtn)} href="/catalog">
            See For Yourself
          </Link>
        </div>
      </section>
    </main>
  );
}
