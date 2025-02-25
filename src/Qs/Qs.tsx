import { styled } from 'solid-styled-components';

import { Q } from '../Q';
import { Today } from './Today';
import { qs, setGridIndex, useCalendarFromServer } from '../store';
import { useSwipe } from '../useSwipe';
import { Grid } from './Grid';

const Container = styled.div({
  position: 'relative',
  height: '100%',
  width: '100%',
});

const move = (change: number) => (previous: number) => {
  const next = previous + change;

  /**
   * This is actually a cool effect where we don't care which quarter we're
   * So you can keep scrolling one way where you can go from the end of a quarter to the start of the next
   */
  if (next < 0 || next > 8) {
    return previous;
  }

  return next;
};

export const Qs = () => {
  // Had to use a signal, couldn't work with just by reference + have the tree be able to read from it
  let ref!: HTMLDivElement;

  useCalendarFromServer();

  useSwipe((direction) => {
    switch (direction) {
      case 'down': {
        setGridIndex(move(-1));
        return;
      }
      case 'up': {
        setGridIndex(move(+1));
        return;
      }
      case 'right': {
        setGridIndex(move(-3));
        return;
      }
      case 'left': {
        setGridIndex(move(+3));
        return;
      }
    }
  });

  // TODO: Improve this indices thing
  return (
    <Container>
      <Grid ref={ref}>
        <Q {...qs().last} indices={[0, 1, 2]} />
        <Q {...qs().now} current indices={[3, 4, 5]} />
        <Q {...qs().next} indices={[6, 7, 8]} />
      </Grid>
      <Today />
    </Container>
  );
};
