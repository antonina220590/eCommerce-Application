import Link from 'next/link';
import React from 'react';
import cl from 'classnames';
import styles from '../../styles/components/logo.module.scss';

export default function Logo() {
  return (
    <h1 className={cl(styles.logo)}>
      <Link href="/">Pages</Link>
    </h1>
  );
}
