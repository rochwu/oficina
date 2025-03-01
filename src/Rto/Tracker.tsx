import { styled } from 'solid-styled-components';

import { vars } from '../css';

type Props = {
  wfo: number;
  required: number;
  percent: number;
};

const Container = styled.div({
  display: 'flex',
  fontSize: vars.tracker.fontSize,
  lineHeight: '28px', // Compare this with Today, to maintain corner padding
});

const Small = styled.span({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: vars.day.fontSize,
  padding: '0 2px',
});

const getPercent = (percent: number) => {
  return `${Math.round(percent).toFixed(1)}`.replace('.0', '');
};

export const Tracker = (props: Props) => {
  const percent = () => getPercent(props.percent);

  return (
    <Container>
      {props.wfo}
      <Small>/</Small>
      {props.required}
      <Small>=</Small>
      {percent()}
      <Small>%</Small>
    </Container>
  );
};
