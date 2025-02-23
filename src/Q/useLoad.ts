import {createEffect, onCleanup} from 'solid-js';

import {onLoad, user} from '../store';
import type {Ym} from '../types';

export const useLoad = (yms: Ym[]) => {
  let unsub = () => {};

  createEffect(() => {
    unsub();

    if (user()) {
      unsub = onLoad(yms);
    }

    onCleanup(unsub);
  });
};
