import {createGlobalStyles} from 'solid-styled-components';
import {root, vars} from './css';

export const GlobalStyles = createGlobalStyles({
  ':root': root,

  body: {
    backgroundColor: vars.backgroundColor,
    color: vars.color,
    fontFamily: vars.fontFamily,

    margin: 0,

    userSelect: 'none',
    '-webkit-user-select': 'none', // Safari
    overscrollBehavior: 'none', // Stops pull-to-refresh
    touchAction: 'none', // Stops gestures
  },

  '#root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100dvh',
    width: '100dvw',
  },
});
