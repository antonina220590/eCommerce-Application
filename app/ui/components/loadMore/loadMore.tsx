'use client';

import clsx from 'clsx';
import Image from 'next/image';
import style from './loadmore.module.scss';

export default function LoadMore() {
  return (
    <div className={clsx(style.spinnerBox)}>
      <Image src="./spinner.svg" alt="spinner" width={56} height={56} />
    </div>
  );
}
