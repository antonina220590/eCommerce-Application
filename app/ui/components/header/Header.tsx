import cl from 'classnames';
import React from 'react';
import Link from 'next/link';
import NavLinks from './nav-links';
import Logo from './Logo';
import styles from '../../styles/components/header.module.scss';
import SVG from '../../../../public/basket.svg';

export default function Header() {
  return (
    <header className={cl(styles.header)}>
      <div className={cl(styles.headerWrapper)}>
        <Logo />
        <div className={cl(styles.headerLinksContainer)}>
          <NavLinks />
        </div>
        <div className={styles.basketWrapper}>
          <Link className={styles.headerBusket} href="basket">
            <SVG className={cl(styles.svgBasket)} width={20} height={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
