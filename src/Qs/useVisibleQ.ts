import {createEffect, Signal} from 'solid-js';
import {isScrolling} from '../store';
import {qs, setVisibleQ, visibleQ} from '../store/quarters';

export const useVisibleQ = (ref: Signal<HTMLDivElement>) => {
  createEffect(() => {
    const el = ref[0]();

    if (isScrolling() || !el) {
      return;
    }

    const {next, now, last} = qs();

    const left = el.scrollLeft;
    const width = el.clientWidth;
    const double = width * 2;

    if (left > double) {
      setVisibleQ(next.quarter);
    } else if (left > width) {
      setVisibleQ(now.quarter);
    } else {
      setVisibleQ(last.quarter);
    }
  });
};
