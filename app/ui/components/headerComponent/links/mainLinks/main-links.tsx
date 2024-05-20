'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from '../links.module.scss';
import links from './links';

export default function MainLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <a
            key={link.name}
            href={link.href}
            className={clsx(styles.linksMain, {
              active: pathname === link.href,
            })}
          >
            {link.name}
          </a>
        );
      })}
    </>
  );
}
