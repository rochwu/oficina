import {createCssVars} from './createCssVars';

export const {root, vars} = createCssVars({
  backgroundColor: 'white',
  color: 'black',
  fontFamily: 'Arial, sans-serif',
  tile: {
    size: '3em', // Min accessible button size
  },
  weekend: {
    color: 'gray',
  },
});
