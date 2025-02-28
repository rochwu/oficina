import { createCssVars } from './createCssVars';

export const { root, vars } = createCssVars(
  { namespace: 'ofcn' },
  {
    black: 'black',
    white: '#FFF5EE',
    fontSize: {
      small: '16px',
      medium: '24px',
      large: '32px',
    },
  },
  (base) => ({
    backgroundColor: '#4A5D5E',
    color: base.white,
    fontFamily: 'Itim, Helvetica, sans-serif',
    gap: '8px',
    day: {
      fontSize: base.fontSize.small,
    },
    today: {
      textDecoration: 'underline',
      fontSize: base.fontSize.medium,
      color: '#F4E1C1',
    },
    marker: {
      size: '48px', // Min accessible button size
    },
    weekend: {
      color: '#8A99A6',
    },
    wfo: {
      backgroundColor: '#D1495B',
      color: base.white,
    },
    pto: {
      backgroundColor: '#92E192',
      color: base.black,
    },
    sick: {
      backgroundColor: '#A080A0', // Dusty Mauve - soft and distinctive
      color: base.black,
    },
    holiday: {
      backgroundColor: '#FFB347',
      color: base.black,
    },
    select: {
      fontSize: base.fontSize.large,
      backgroundColor: base.white,
      color: base.black,
      hover: {
        backgroundColor: base.black,
        color: base.white,
      },
    },
    hint: {
      size: '12px',
    },
    tracker: {
      fontSize: base.fontSize.large,
    },
  }),
);
