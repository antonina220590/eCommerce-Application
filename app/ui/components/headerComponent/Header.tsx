'use client';

import cl from 'classnames';
import React, { useEffect, useState } from 'react';
import { NavLinks, NavIcons } from './links/nav-links';
import Logo from './logo/Logo';
import styles from './header.module.scss';

export default function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const handleNavClose = () => {
    const MOBILE_VIEW = 767.5;
    const isMobileView = window.innerWidth < MOBILE_VIEW;
    if (isNavCollapsed && isMobileView) {
      setIsNavCollapsed(false);
    }
  };
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    window.addEventListener('resize', handleNavClose);
    return () => window.removeEventListener('resize', handleNavClose);
  });

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
          className={cl(styles.hamburger)}
          onClick={handleNavCollapse}
          role="presentation"
        >
          <span />
        </div>
      </div>
    </header>
  );
}
