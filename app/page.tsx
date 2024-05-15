import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './mainPage.module.scss';

export default function Home() {
  return (
    <main className={clsx(styles.main)}>
      <section className={clsx(styles.mainAbout)}>
        <div className={clsx(styles.mainAboutBox)}>
          <h2 className={clsx(styles.mainAboutTitle)}>
            WELCOME TO YOUR HAPPY PLACE.
          </h2>
          <p className={clsx(styles.mainAboutText)}>
            Shop brand new books at least 50% off* list prices every day.
          </p>
          <Link className={clsx(styles.mainAboutBtn)} href="/catalog">
            See For Yourself
          </Link>
        </div>
        <div className={clsx(styles.mainAboutImg)}>
          <Image
            className={clsx(styles.mainAboutImgPicture)}
            src="/cover.webp"
            alt="man and woman"
            width="1200"
            height="1250"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            role="presentation"
            sizes="100vw"
          />
        </div>
      </section>
    </main>
  );
}
