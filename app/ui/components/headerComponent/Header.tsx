'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import NavLinks from './links/simpleLinks/nav-links';
import NavIcons from './links/iconLinks/icon-links';
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
      className={clsx(styles.header)}
      onClick={handleNavClose}
      role="presentation"
    >
      <div className={clsx(styles.headerWrapper)}>
        <div className={clsx(styles.headerContainer)}>
          <Logo />
          <div
            className={clsx(styles.headerLinksContainer, {
              [styles.headerLinksContainer_active]: isNavCollapsed,
            })}
          >
            <NavLinks />
          </div>
        </div>
        <div className={clsx(styles.headerIcons)}>
          <NavIcons />
        </div>
        <div
          className={clsx(styles.hamburger)}
          onClick={handleNavCollapse}
          role="presentation"
        >
          <span />
        </div>
      </div>
    </header>
  );
}
