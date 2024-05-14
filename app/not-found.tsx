import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.errorMain}>
      <section className={clsx(styles.error)}>
        <div className={clsx(styles.errorWrapper)}>
          <div className={clsx(styles.errorText)}>
            <h1 className={clsx(styles.errorMessage)}>Page Not Found...</h1>
            <Link className={clsx(styles.errorLink)} href="./">
              GO HOME
            </Link>
          </div>
          <div className={clsx(styles.errorImagebox)}>
            <Image
              src="/404_page.svg"
              alt="page not found"
              fill
              role="presentation"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
