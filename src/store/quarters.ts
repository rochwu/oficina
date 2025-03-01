import { createMemo, createSignal, untrack } from 'solid-js';

import { today } from './today';
import { getQuarters } from '../date/quarters';

// Only wake up `qs` if actual values changes
const month = () => today().getMonth();
const year = () => today().getFullYear();

export const qs = createMemo(() => {
  const quarters = getQuarters({
    month: month(),
    year: year(),
  });

  return quarters;
});

export const [visibleQ, setVisibleQ] = createSignal(untrack(qs).now.quarter);
