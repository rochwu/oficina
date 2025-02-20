import {Component, Show} from 'solid-js';
import {styled} from 'solid-styled-components';
import {useMonth, useYear} from '../Context';
import {vars} from '../css';
import {getTileStyle} from './getTileStyle';
import {useEvents} from './useEvents';
import {store} from '../store';

type Props = {
  day: number;
  weekday: number;
};

const Tile = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '50%',
  width: '100%',
  height: '100%',
});

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  aspectRatio: '1 / 1',
  width: vars.tile.size,

  cursor: 'pointer',
  // padding: '8px',
  // boxSizing: 'border-box',

  '&[data-weekend]': {
    color: vars.weekend.color,
  },

  '&[data-disabled="true"]': {
    pointerEvents: 'none',
  },
});

export const Day: Component<Props> = (props) => {
  const year = useYear();
  const month = useMonth();

  const isWeekend = props.weekday === 0 || props.weekday === 6;

  const events = useEvents({year, month, day: props.day});

  const type = () => store.calendar[year]?.[month]?.[props.day]?.type;

  const disabled = () => {
    const mine = type();

    return mine && mine !== store.type;
  };

  return (
    <Container
      role="button"
      {...events}
      data-disabled={disabled()}
      data-weekend={isWeekend ? '' : undefined}
    >
      <Show when={props.day >= 0} fallback={<Tile />}>
        <Tile style={getTileStyle(type())}>{props.day + 1}</Tile>
      </Show>
    </Container>
  );
};
