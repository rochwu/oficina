import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: vars.marker.size,
  width: vars.marker.size,
});

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Day: Component<{ day: string }> = (props) => {
  const isWeekend = () => props.day === 'S';

  return (
    <Container style={isWeekend() ? { color: vars.weekend.color } : undefined}>
      {props.day}
    </Container>
  );
};

export const Weekdays: Component = () => {
  return <For each={weekdays}>{(day) => <Day day={day} />}</For>;
};
