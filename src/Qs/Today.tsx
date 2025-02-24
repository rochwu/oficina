import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '../css';
import {today} from '../store';

type Props = {};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  bottom: 0,
  right: 0,

  cursor: 'pointer',

  minHeight: vars.marker.size,
  padding: '0 16px', // Whatever helps fit the 48px size uniformly in a corner

  textDecoration: vars.today.textDecoration,
  color: vars.today.color,
});

export const Today: Component<Props> = () => {
  const go = () => {
    const month = today().getMonth();

    // day > button > month
    const el = document.querySelector(`[data-month="${month}"]`);

    el?.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
  };

  return (
    <Container role="button" onClick={go}>
      tdy
    </Container>
  );
};
