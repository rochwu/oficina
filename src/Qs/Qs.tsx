import {createSignal} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Q} from '../Q';
import {SnapScroll} from './SnapScroll';
import {Today} from './Today';
import {useVisibleQ} from './useVisibleQ';
import {qs, useCalendarFromServer} from '../store';

const Container = styled.div({
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const Qs = () => {
  // Had to use a signal, couldn't work with just by reference + have the tree be able to read from it
  const ref = createSignal<HTMLDivElement>({} as never);

  useVisibleQ(ref);
  useCalendarFromServer();

  return (
    <Container>
      <SnapScroll ref={ref}>
        <Q {...qs().last} />
        <Q {...qs().now} current />
        <Q {...qs().next} />
      </SnapScroll>
      <Today />
    </Container>
  );
};
