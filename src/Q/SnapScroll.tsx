import {Component, JSXElement} from 'solid-js';
import {styled} from 'solid-styled-components';
import {setIsScrolling} from '../store/store';

type Props = {
  children: JSXElement;
};

const Container = styled.div({
  height: '100%',
  width: '100%',

  scrollbarWidth: 'none',

  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
});

export const SnapScroll: Component<Props> = (props) => {
  let timeout: number;
  let started = false;

  const scroll = () => {
    clearTimeout(timeout);

    if (!started) {
      started = true;
      setIsScrolling(true);
    }

    timeout = window.setTimeout(() => {
      started = false;
      setIsScrolling(false);
    }, 100);
  };

  return <Container onScroll={scroll}>{props.children}</Container>;
};
