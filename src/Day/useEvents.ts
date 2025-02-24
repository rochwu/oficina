import type { JSX } from 'solid-js/jsx-runtime';

import { removeDelayMs } from '../constants';
import { isScrolling, remove, select } from '../store';
import type { Ymd } from '../types';

export const useEvents = ({
  year,
  month,
  day,
}: Ymd): JSX.HTMLAttributes<HTMLDivElement> => {
  let stopSave = true;
  let timeout = NaN;

  const reset = () => {
    clearTimeout(timeout);
    stopSave = true;
  };

  const start = () => {
    stopSave = false;
    timeout = window.setTimeout(() => {
      stopSave = true;

      if (!isScrolling()) {
        remove({ month, year, day });
      }
    }, removeDelayMs);
  };

  const end = () => {
    const stop = stopSave;
    reset();

    if (!stop) {
      if (!isScrolling()) {
        select({ month, year, day });
      }
    }
  };

  return {
    onBlur: reset,
    onPointerDown: start,
    onPointerUp: end,
  };
};
