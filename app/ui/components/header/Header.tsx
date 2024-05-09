'use client';

import cl from 'classnames';
import React, { useState } from 'react';
import { NavLinks, NavIcons } from './nav-links';
import Logo from './Logo';
import styles from '../../styles/components/header.module.scss';
import style from '../../styles/components/hamburger.module.scss';

export default function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const handleNavClose = () => {
    if (isNavCollapsed && window.innerWidth < 1024) {
      setIsNavCollapsed(false);
    }
  };
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  window.addEventListener('resize', handleNavClose);

  return (
    <header
      className={cl(styles.header)}
      onClick={handleNavClose}
      role="presentation"
    >
      <div className={cl(styles.headerWrapper)}>
        <div className={cl(styles.headerContainer)}>
          <Logo />
          <div
            className={
              isNavCollapsed
                ? styles.headerLinksContainer_open
                : styles.headerLinksContainer
            }
          >
            <NavLinks />
          </div>
        </div>
        <div className={styles.headerIcons}>
          <NavIcons />
        </div>
        <div
          className={cl(style.hamburger)}
          onClick={handleNavCollapse}
          role="presentation"
        >
          <span />
        </div>
      </div>
    </header>
  );
}
