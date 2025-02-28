import { onCleanup, onMount, untrack, type JSXElement } from 'solid-js';
import { styled } from 'solid-styled-components';

import { gridIndex } from '../store';

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
  let ref!: HTMLDivElement;

  onMount(() => {
    const callback = () => {
      document
        .querySelector(`[data-index="${untrack(gridIndex)}"]`)
        ?.scrollIntoView({
          behavior: 'instant',
        });
    };

    const observer = new ResizeObserver(callback);

    observer.observe(document.body);

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return <Container ref={ref}>{props.children}</Container>;
};
