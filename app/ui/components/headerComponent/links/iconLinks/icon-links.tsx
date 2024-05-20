'use client';

import React, { useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { parseCookies, destroyCookie } from 'nookies';
import clsx from 'clsx';
import linkIcons from './links';

export default function NavIcons() {
  const pathname = usePathname();
  const cookies = parseCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userName } = cookies;

  useEffect(() => {
    if (userName) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [userName]);

  const filteredLinks = linkIcons.filter((link) => {
    if (link.name === 'Sign Up' || link.name === 'Login') {
      return !isLoggedIn;
    }
    if (link.name === 'Logout') {
      return isLoggedIn;
    }
    return true;
  });

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, linkName: string) => {
    switch (linkName) {
      case 'Logout':
        e.preventDefault();
        Object.keys(cookies).forEach((cookieName) => {
          destroyCookie(null, cookieName, { path: '/' });
        });
        window.location.href = '/';
        break;
      default:
        break;
    }
  };
  return loading
    ? null
    : filteredLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx({
            active: pathname === link.href,
          })}
          onClick={(e) => handleClick(e, link.name as string)}
        >
          {link.image}
        </Link>
      ));
}
