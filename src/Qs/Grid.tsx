import { onCleanup, onMount, type JSXElement } from 'solid-js';
import { styled } from 'solid-styled-components';

import { setIsScrolling } from '../store';

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
    const observer = new IntersectionObserver(
      (entries) => {
        const fully = entries.some((entry) => entry.intersectionRatio === 1);

        if (fully) {
          setIsScrolling(false);
        }
      },
      {
        root: ref,
        threshold: [1],
      },
    );

    const els = document.querySelectorAll('[data-index]');

    els.forEach((el) => {
      observer.observe(el);
    });

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return <Container ref={ref}>{props.children}</Container>;
};
