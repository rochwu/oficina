import type { Component } from 'solid-js';
import { createMemo } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';
import { getWeekdays, getWeekdaysRemaining } from '../date';
import { today } from '../store';
import type { ByTypes, Ym } from '../types';
import { Possible } from './Possible';
import { Tracker } from './Tracker';

type Props = {
  types: ByTypes;
  yms: Ym[];
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: vars.gap,
});

const getPercent = (n: number, d: number) => {
  return Math.round((n / d) * 100);
};

export const Rto: Component<Props> = (props) => {
  const weekdays = props.yms.reduce((days, ym) => {
    return days + getWeekdays(ym);
  }, 0);

  const rto = createMemo(() => {
    const { wfo = 0, pto = 0, holiday = 0, sick = 0 } = props.types;
    const total = weekdays - holiday - pto - sick;
    const required = Math.ceil((weekdays - holiday - pto - sick) / 2);

    return {
      wfo,
      required,
      missing: Math.max(required - wfo, 0),
      possible: getWeekdaysRemaining({ from: today(), to: props.yms.at(-1)! }),
      percent: getPercent(wfo, total),
    };
  });

  return (
    <>
      <Container>
        <Possible start={rto().missing} end={`${rto().possible} posbl`} />
        <Tracker {...rto()} />
      </Container>
    </>
  );
};
