import {createCssVars} from './createCssVars';

export const {root, vars} = createCssVars(
  {namespace: 'ofcn'},
  {
    white: '#FFF5EE',
  },
  (base) => ({
    backgroundColor: '#4A5D5E',
    color: base.white,
    fontFamily: 'Itim, Helvetica, sans-serif',
    gap: '8px',
    day: {
      fontSize: '16px',
    },
    today: {
      textDecoration: 'underline',
      fontSize: '24px',
      color: base.white,
    },
    tile: {
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
      color: 'black',
    },
    sick: {
      backgroundColor: '#A080A0', // Dusty Mauve - soft and distinctive
      color: 'black',
    },
    holiday: {
      backgroundColor: '#FFB347',
      color: 'black',
    },
    select: {
      fontSize: '32px',
      backgroundColor: base.white,
      color: 'black',
      hover: {
        backgroundColor: 'black',
        color: base.white,
      },
    },
    hint: {
      size: '12px',
    },
    tracker: {
      fontSize: '32px',
    },
  }),
);
