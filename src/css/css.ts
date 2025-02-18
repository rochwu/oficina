import {createCssVars} from './createCssVars';

export const {root, vars} = createCssVars({
  backgroundColor: 'white',
  color: 'black',
  fontFamily: 'Arial, sans-serif',
  gap: '8px',
  tile: {
    size: '48px', // Min accessible button size
  },
  weekend: {
    color: 'gray',
  },
  wfo: {
    backgroundColor: '#3F51B5',
    color: 'white',
  },
  pto: {
    backgroundColor: '#FFB74D',
    color: 'black',
  },
  holiday: {
    backgroundColor: '#B0BEC5',
    color: 'black',
  },
});
