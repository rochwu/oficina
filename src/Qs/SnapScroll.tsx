import {Component, JSXElement, onMount, Signal} from 'solid-js';
import {styled} from 'solid-styled-components';
import {setIsScrolling} from '../store';
import {useIsSnapped} from './useIsSnapped';

type Props = {
  ref: Signal<HTMLDivElement>;
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

  overflow: 'scroll',
  scrollSnapType: 'both mandatory',
  scrollBehavior: 'smooth',
});

export const SnapScroll: Component<Props> = (props) => {
  let stopped: number; // sees if scrolling has stopped
  let started = false;
  let fixing: number; // sees if snap caused scrolling has stopped

  const isSnapped = useIsSnapped(props.ref[0]);

  const forceSnap = () => {
    clearInterval(fixing);

    fixing = window.setTimeout(() => {
      const container = props.ref[0]()!;
      const center = [...container.children].at(4)!;

      const snapped = isSnapped(center.getBoundingClientRect());

      if (!snapped) {
        // scrollIntoView in combination to scroll-snap forces the child that is nearest to snap into place
        container.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        });
      }
    }, 100); // just felt like I gave snap enough time, it should take it 16ms ie: 60FPS to start
  };

  const scroll = () => {
    clearTimeout(stopped);
    clearInterval(fixing); // Stops fixing if snap is snapping

    if (!started) {
      started = true;
      setIsScrolling(true);
    }

    stopped = window.setTimeout(() => {
      started = false;
      setIsScrolling(false);
      forceSnap();
    }, 100);
  };

  return (
    <Container ref={props.ref[1]} onScroll={scroll}>
      {props.children}
    </Container>
  );
};
