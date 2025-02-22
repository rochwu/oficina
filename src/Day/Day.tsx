import {Component, Show} from 'solid-js';
import {styled} from 'solid-styled-components';
import {useMonth, useYear} from '../Context';
import {vars} from '../css';
import {store} from '../store';
import {useEvents} from './useEvents';
import {Marker} from './Marker';
import {today, todayDataAttribute} from '../constants';
import {DayType} from '../types';

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

const Fallback = styled.div({});

export const Day: Component<Props> = (props) => {
  const year = useYear();
  const month = useMonth();

  const isWeekend = props.weekday === 0 || props.weekday === 6;

  const events = useEvents({year, month, day: props.day});

  const type = () =>
    store.calendar[year]?.[month]?.[props.day]?.type as DayType | undefined;

  const isInMonth = () => props.day >= 0; // NaN

  const disabled = () => {
    const mine = type();

    return mine && mine !== store.type;
  };

  const maybeToday = () => {
    const is =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() - 1 === props.day;

    return is
      ? {
          [todayDataAttribute]: '',
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
