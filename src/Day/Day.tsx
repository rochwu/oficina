import {Component, Show} from 'solid-js';
import {styled} from 'solid-styled-components';
import {vars} from '../css';

type Props = {
  day: number;
  weekday: number;
};

const Tile = styled.div({});

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: vars.tile.size,
  width: vars.tile.size,
  cursor: 'pointer',
});

export const Day: Component<Props> = (props) => {
  const click = () => {
    console.log('click', props.day);
  };

  const isWeekend = props.weekday === 0 || props.weekday === 6;

  return (
    <Container
      role="button"
      onClick={click}
      style={isWeekend ? {color: vars.weekend.color} : undefined}
    >
      <Show when={props.day >= 0} fallback={<Tile />}>
        <Tile>{props.day + 1}</Tile>
      </Show>
    </Container>
  );
};
