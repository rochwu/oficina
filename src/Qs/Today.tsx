import { styled } from 'solid-styled-components';

import { vars } from '../css';
import { setGridIndex } from '../store';

type Props = {};

const Container = styled.button({
  all: 'unset',

  display: 'flex',
  justifyContent: 'end',
  alignItems: 'end',

  position: 'absolute',
  bottom: 0,
  right: 0,

  cursor: 'pointer',

  minHeight: vars.marker.size,
  minWidth: vars.marker.size,
});

const Text = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '10px', // Makes it really close with Tracker's padding. Which is mostly line-height
  textDecoration: vars.today.textDecoration,
  color: vars.today.color,
});

export const Today = (_: Props) => {
  const goTo = () => {
    const el = document.querySelector('[data-today]')?.closest('[data-index]')!;

    setGridIndex(Number(el.getAttribute('data-index')!));
  };

  return (
    <Container onClick={goTo}>
      <Text>tdy</Text>
    </Container>
  );
};
