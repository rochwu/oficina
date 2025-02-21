import {createCssVars} from './createCssVars';

export const {root, vars} = createCssVars(
  {
    white: '#FFF5EE',
  },
  (base) => ({
    backgroundColor: '#4A5D5E',
    color: base.white,
    fontFamily: 'Arial, sans-serif',
    gap: '8px',
    day: {
      fontSize: '16px',
    },
    today: {
      fontSize: '24px',
    },
    tile: {
      size: '48px', // Min accessible button size
    },
    weekend: {
      color: '#708090',
    },
    wfo: {
      backgroundColor: '#FF7F50',
      color: 'black',
    },
    pto: {
      backgroundColor: '#98FF98',
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
    },
    hint: {
      size: '12px',
    },
  }),
);
