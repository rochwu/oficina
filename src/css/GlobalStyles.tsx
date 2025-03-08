import 'normalize.css';

import { createGlobalStyles } from 'solid-styled-components';

import { root, vars } from './css';

export const GlobalStyles = createGlobalStyles({
  ':root': root,

  body: {
    backgroundColor: vars.backgroundColor,
    color: vars.color,
    fontFamily: vars.fontFamily,

    margin: 0,

    userSelect: 'none',
    WebkitUserSelect: 'none', // Safari
    touchAction: 'none', // Stops gestures

    overflow: 'hidden', // Stops pull-to-refresh
    overscrollBehavior: 'none', // Stops the iOS bounce effect at the edges

    WebkitTapHighlightColor: 'transparent', // Removes responsive box
  },

  '#root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100dvh',
    width: '100dvw',
  },
});
