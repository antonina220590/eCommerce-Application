import clsx from 'clsx';
import UserIcon from '@/public/user.svg';
import style from '../links.module.scss';
import BasketIcon from '../../../../../../public/basket.svg';
import LoginIcon from '../../../../../../public/login.svg';
import SignUpIcon from '../../../../../../public/signup.svg';
import LogoutIcon from '../../../../../../public/logout.svg';
import Links from '../linkInterface';

const linkIcons: Links[] = [
  {
    name: 'Basket',
    href: '/basket',
    image: <BasketIcon className={clsx(style.svgBasket)} />,
  },

  {
    name: 'Sign Up',
    href: '/registration',
    image: <SignUpIcon className={clsx(style.svgLogin)} />,
  },

  {
    name: 'Login',
    href: '/login',
    image: <LoginIcon className={clsx(style.svgSignUp)} />,
  },

  {
    name: 'User',
    href: '/user',
    image: <UserIcon className={clsx(style.svgSignUp)} />,
  },

  {
    name: 'Logout',
    href: '/logout',
    image: <LogoutIcon className={clsx(style.svgSignUp)} />,
  },
];

export default linkIcons;
