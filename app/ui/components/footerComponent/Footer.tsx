import clsx from 'clsx';
import Link from 'next/link';
import styles from './footer.module.scss';
import GithabIcon from '../../../../public/github.svg';

export default function Footer() {
  return (
    <footer className={clsx(styles.footer)}>
      <div className={clsx(styles.footerWrapper)}>
        <Link
          className={clsx(styles.footerRSS)}
          href="https://rs.school/"
          target="_blank"
        >
          RS School
        </Link>
        <span className={clsx(styles.footerYear)}>2024</span>
        <div className={clsx(styles.footerTeam)}>
          <Link
            className={styles.footerTeamMember}
            href="https://github.com/antonina220590"
            target="_blank"
          >
            <GithabIcon className={clsx(styles.svgGithub)} />
          </Link>
          <Link
            className={styles.footerTeamMember}
            href="https://github.com/gbogdanova"
            target="_blank"
          >
            <GithabIcon className={clsx(styles.svgGithub)} />
          </Link>
          <Link
            className={styles.footerTeamMember}
            href="https://github.com/yauhenbayeu"
            target="_blank"
          >
            <GithabIcon className={clsx(styles.svgGithub)} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
