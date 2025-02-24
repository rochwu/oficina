import type { Component } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';

type Props = {
  wfo: number;
  required: number;
  percent: number;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: vars.tracker.fontSize,
});

const getPercent = (percent: number) => {
  return `${Math.round(percent).toFixed(1)}`.replace('.0', '');
};

export const Tracker: Component<Props> = (props) => {
  const percent = () => getPercent(props.percent);

  return (
    <Container>{`${props.wfo} / ${props.required} = ${percent()}%`}</Container>
  );
};
