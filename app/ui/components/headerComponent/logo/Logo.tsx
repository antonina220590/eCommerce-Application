import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import styles from './logo.module.scss';

export default function Logo() {
  return (
    <h1 className={clsx(styles.logo)}>
      <Link href="/">Pages</Link>
    </h1>
  );
}
