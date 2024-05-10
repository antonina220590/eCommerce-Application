'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './links.module.scss';
import style from '../header.module.scss';
import BasketIcon from '../../../../../public/basket.svg';
import LoginIcon from '../../../../../public/login.svg';
import SignUpIcon from '../../../../../public/signup.svg';

export const links = [
  { name: 'Main', href: '/' },
  {
    name: 'Catalog',
    href: '/catalog',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(styles.links, {
              active: pathname === link.href,
            })}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}

const linkIcons = [
  {
    name: 'Basket',
    href: '/basket',
    image: <BasketIcon className={clsx(style.svgBasket)} />,
  },

  {
    name: 'Sign Up',
    href: '/registration',
    image: <LoginIcon className={clsx(style.svgSignUp)} />,
  },

  {
    name: 'Login',
    href: '/login',
    image: <SignUpIcon className={clsx(style.svgLogin)} />,
  },
];
export function NavIcons() {
  const pathname = usePathname();
  return (
    <>
      {linkIcons.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx({
              active: pathname === link.href,
            })}
          >
            {link.image}
          </Link>
        );
      })}
    </>
  );
}
