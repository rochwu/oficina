import {createMemo, createSignal} from 'solid-js';
import {getQuarters} from '../date/quarters';
import {ByTypes, Quarter} from '../types';
import {today} from './today';

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

export const currentQ = createMemo(() => {
  return qs().now.quarter;
});

export const [visibleQ, setVisibleQ] = createSignal(currentQ());

export const [rtoByQ, setRtoByQ] = createSignal<Record<Quarter, ByTypes>>(
  {} as never,
);
