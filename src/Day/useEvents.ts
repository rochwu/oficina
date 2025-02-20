import {JSX} from 'solid-js/jsx-runtime';
import {remove, select} from '../store/store';
import {Ymd} from '../types';

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
      remove({month, year, day});
    }, 500);
  };

  const end = () => {
    const stop = stopSave;
    reset();

    if (!stop) {
      select({month, year, day});
    }
  };

  return {
    onBlur: reset,
    onPointerDown: start,
    onPointerUp: end,
  };
};
