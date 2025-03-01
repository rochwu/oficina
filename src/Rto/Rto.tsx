import { createMemo } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';
import { getWeekdays, getWeekdaysRemaining } from '../date';
import { qs, today } from '../store';
import { createSum } from './createSum';
import { Possible } from './Possible';
import { Tracker } from './Tracker';
import type { Numbers } from './types';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: vars.gap,

  gap: '2px',
});

const getPercent = (n: number, d: number) => {
  return Math.round((n / d) * 100);
};

export const Rto = () => {
  const now = () => qs().now;
  const yms = () => now().yms;
  const sum = createSum(yms);

  const possible = createMemo(() => {
    return getWeekdaysRemaining({ from: today(), to: yms().at(-1)! });
  });

  const weekdays = createMemo(() => {
    return yms().reduce((days, ym) => {
      return days + getWeekdays(ym);
    }, 0);
  });

  const rto = createMemo<Numbers>(() => {
    const totalWeekdays = weekdays();

    const { wfo = 0, pto = 0, holiday = 0, sick = 0 } = sum();

    const total = totalWeekdays - holiday - pto - sick;
    const required = Math.ceil((totalWeekdays - holiday - pto - sick) / 2);

    return {
      wfo,
      required,
      missing: Math.max(required - wfo, 0),
      possible: possible(),
      percent: getPercent(wfo, total),
    };
  });

  return (
    <Container>
      <Possible {...rto()} />
      <Tracker {...rto()} />
    </Container>
  );
};
