import {Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {vars} from '../css';
import {todayDataAttribute} from '../constants';

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
    const el = document.querySelector(`[${todayDataAttribute}]`);

    console.log(el);

    el?.scrollIntoView({block: 'center'});
  };

  return (
    <Container role="button" onClick={go}>
      tdy
    </Container>
  );
};
