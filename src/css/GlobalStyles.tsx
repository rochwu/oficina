import {createGlobalStyles} from 'solid-styled-components';
import {root, vars} from './css';

export const GlobalStyles = createGlobalStyles({
  ':root': root,
  body: {
    backgroundColor: vars.backgroundColor,
    color: vars.color,
    fontFamily: vars.fontFamily,
    userSelect: 'none',
  },
});
