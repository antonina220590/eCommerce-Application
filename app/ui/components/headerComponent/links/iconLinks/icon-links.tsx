'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import linkIcons from './links';

export default function NavIcons() {
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
