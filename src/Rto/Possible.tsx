import { styled } from 'solid-styled-components';

import type { Numbers } from './types';
import { vars } from '../css';

const Container = styled.div({
  display: 'flex',
  gap: '2px',

  borderRadius: '6px',
  backgroundColor: vars.white,
  color: vars.black,
  padding: '4px 8px',
});

const Divider = styled.span({});

const Start = styled.span({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const End = styled.span({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Possible = (props: Numbers) => {
  return (
    <Container>
      <Start>{props.missing}</Start>
      <Divider>{'/'}</Divider>
      <End>{props.possible} posbl</End>
    </Container>
  );
};
