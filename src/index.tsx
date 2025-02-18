/* @refresh reload */
import {render} from 'solid-js/web';

import {App} from './App';
import {GlobalStyles} from './css';

const root = document.getElementById('root');

render(
  () => (
    <>
      <GlobalStyles />
      <App />
    </>
  ),
  root!,
);
