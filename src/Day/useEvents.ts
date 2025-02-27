import type { JSX } from 'solid-js/jsx-runtime';

import { removeDelayMs } from '../constants';
import { remove, select } from '../store';
import type { Ymd } from '../types';

export const useEvents = ({
  year,
  month,
  day,
}: Ymd): JSX.HTMLAttributes<HTMLButtonElement> => {
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

      remove({ month, year, day });
    }, removeDelayMs);
  };

  const end = () => {
    const stop = stopSave;
    reset();

    if (!stop) {
      select({ month, year, day });
    }
  };

  return {
    onBlur: reset,
    onPointerDown: start,
    onPointerUp: end,
  };
};
