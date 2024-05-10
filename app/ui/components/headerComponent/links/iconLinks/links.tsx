import clsx from 'clsx';
import style from '../links.module.scss';
import BasketIcon from '../../../../../../public/basket.svg';
import LoginIcon from '../../../../../../public/login.svg';
import SignUpIcon from '../../../../../../public/signup.svg';
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
    image: <LoginIcon className={clsx(style.svgSignUp)} />,
  },

  {
    name: 'Login',
    href: '/login',
    image: <SignUpIcon className={clsx(style.svgLogin)} />,
  },
];

export default linkIcons;
