import type {Component} from 'solid-js';
import {Show} from 'solid-js';
import {styled} from 'solid-styled-components';

import {useMonth, useYear} from '../Context';
import {vars} from '../css';
import {dayType, getDayType, today} from '../store';
import {Marker} from './Marker';
import {useEvents} from './useEvents';

type Props = {
  day: number;
  weekday: number;
};

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  aspectRatio: '1 / 1',
  width: vars.marker.size,

  '&[data-weekend]': {
    color: vars.weekend.color,
  },

  cursor: 'pointer',

  '&[data-disabled="true"]': {
    pointerEvents: 'none',
    cursor: 'none',
  },
});

// Need this to hold a spot in the grid layout
const Fallback = styled.div({});

export const Day: Component<Props> = (props) => {
  const year = useYear();
  const month = useMonth();

  const isWeekend = props.weekday === 0 || props.weekday === 6;

  const ymd = () => ({year, month, day: props.day});

  const events = useEvents(ymd());

  const type = () => getDayType(ymd());

  const isInMonth = () => props.day >= 0; // NaN

  const disabled = () => {
    const mine = type();

    return mine && mine !== dayType();
  };

  const maybeToday = () => {
    const date = today();

    const is =
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() - 1 === props.day;

    return is
      ? {
          'data-today': '',
        }
      : {};
  };

  return (
    <Show when={isInMonth()} fallback={<Fallback />}>
      <Container
        role="button"
        {...events}
        data-disabled={disabled()}
        data-weekend={isWeekend ? '' : undefined}
      >
        <Marker type={type()} {...maybeToday()}>
          {props.day + 1}
        </Marker>
      </Container>
    </Show>
  );
};
