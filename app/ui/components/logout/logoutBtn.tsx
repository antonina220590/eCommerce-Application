import clsx from 'clsx';
import styles from './logout.module.scss';
import LogoutIcon from '../../../../public/logout.svg';

export default function LogoutBtn() {
  return (
    <div className={clsx(styles.box)}>
      <LogoutIcon className={clsx(styles.svgBasket)} />
    </div>
  );
}
