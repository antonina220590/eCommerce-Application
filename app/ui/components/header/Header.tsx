import cl from 'classnames';
import NavLinks from './nav-links';
import Logo from './Logo';
import styles from '../../styles/components/header.module.scss';

export default function Header() {
  return (
    <header className={cl(styles.header)}>
      <div className={cl(styles.headerWrapper)}>
        <Logo />
        <div className={cl(styles.headerLinksContainer)}>
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
