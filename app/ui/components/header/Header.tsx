'use client';

import cl from 'classnames';
import React from 'react';
import { NavLinks, NavIcons } from './nav-links';
import Logo from './Logo';
import styles from '../../styles/components/header.module.scss';

export default function Header() {
  return (
    <header className={cl(styles.header)}>
      <div className={cl(styles.headerWrapper)}>
        <Logo />
        <div className={cl(styles.headerLinksContainer)}>
          <NavLinks />
        </div>
        <div className={styles.headerIcons}>
          <NavIcons />
        </div>
      </div>
    </header>
  );
}
