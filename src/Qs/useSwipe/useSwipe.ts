import { onCleanup, onMount } from 'solid-js';

import {
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
} from './handleTouch';
import { handleWheel } from './handleWheel';
import type { SwipeHandler } from './types';

export const useSwipe = (callback: SwipeHandler) => {
  const wheel = handleWheel(callback);
  const touchstart = handleTouchStart(callback);
  const touchmove = handleTouchMove(callback);
  const touchend = handleTouchEnd(callback);

  onMount(() => {
    document.addEventListener('wheel', wheel);
    document.addEventListener('touchstart', touchstart);
    document.addEventListener('touchmove', touchmove);
    document.addEventListener('touchend', touchend);

    onCleanup(() => {
      return () => {
        document.removeEventListener('wheel', wheel);
        document.removeEventListener('touchstart', touchstart);
        document.removeEventListener('touchmove', touchmove);
        document.removeEventListener('touchend', touchend);
      };
    });
  });
};
