import type { JSXElement } from 'solid-js';
import { styled } from 'solid-styled-components';

type Props = {
  children: JSXElement;
};

const Container = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 100%)',
  gridTemplateRows: 'repeat(3, 100%)',
  gridAutoFlow: 'column',

  // The small screen horizontal months were too close to each other
  columnGap: '10%',

  height: '100%',
  width: '100%',

  scrollbarWidth: 'none',

  overflow: 'hidden',
  touchAction: 'none',
});

export const Grid = (props: Props) => {
  return <Container>{props.children}</Container>;
};
