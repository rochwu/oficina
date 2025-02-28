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

const emptyColor = vars.black;
const fullColor = vars.white;

export const Tracker = (props: Props) => {
  const percent = () => getPercent(props.percent);
  const progress = () => {
    return 100 - Math.round((props.percent / 50) * 100);
  };

  return (
    <Container
      style={{
        background: `linear-gradient(to left, ${emptyColor} 0%, ${emptyColor} ${progress()}%, ${fullColor} ${progress()}%, ${fullColor} 100%)`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      }}
    >
      {props.wfo}
      <Small>/</Small>
      {props.required}
      <Small>=</Small>
      {percent()}
      <Small>%</Small>
    </Container>
    // <Container>{`${props.wfo} / ${props.required} = ${percent()}%`}</Container>
  );
};
