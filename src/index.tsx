/* @refresh reload */
import { render } from 'solid-js/web';

import { App } from './App';
import { expose } from './dev/expose';

const root = document.getElementById('root');

document.addEventListener(
  'contextmenu',
  (e) => {
    e.preventDefault();
  },
  { passive: false },
);

render(() => <App />, root!);

expose();
