import {Component, JSX, Show} from 'solid-js';
import {styled} from 'solid-styled-components';
import {useMonth, useYear} from '../Context';
import {vars} from '../css';
import {remove, select, store} from '../store/store';
import {getTileStyle} from './getTileStyle';

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
});

export const Day: Component<Props> = (props) => {
  const year = useYear();
  const month = useMonth();

  const isWeekend = props.weekday === 0 || props.weekday === 6;

  let stopSave = true;
  let timeout = NaN;

  const reset = () => {
    clearTimeout(timeout);
    stopSave = true;
  };

  const down = () => {
    stopSave = false;
    timeout = window.setTimeout(() => {
      stopSave = true;
      remove({month, year, day: props.day});
    }, 1000);
  };

  const up = () => {
    const stop = stopSave;
    reset();

    if (!stop) {
      select({month, year, day: props.day});
    }
  };

  return (
    <Container
      role="button"
      onPointerUp={up}
      onPointerDown={down}
      onBlur={reset}
      style={isWeekend ? {color: vars.weekend.color} : undefined}
    >
      <Show when={props.day >= 0} fallback={<Tile />}>
        <Tile style={getTileStyle({year, month, day: props.day})}>
          {props.day + 1}
        </Tile>
      </Show>
    </Container>
  );
};
