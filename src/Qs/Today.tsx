import { styled } from 'solid-styled-components';

import { vars } from '../css';
import { setGridIndex } from '../store';

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

export const Today = (_: Props) => {
  const goTo = () => {
    const el = document.querySelector('[data-today]')?.closest('[data-index]')!;

    setGridIndex(Number(el.getAttribute('data-index')!));
  };

  return (
    <Container role="button" onClick={goTo}>
      tdy
    </Container>
  );
};
