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
    image: <SignUpIcon className={clsx(style.svgLogin)} />,
  },

  {
    name: 'Login',
    href: '/login',
    image: <LoginIcon className={clsx(style.svgSignUp)} />,
  },
];

export default linkIcons;
