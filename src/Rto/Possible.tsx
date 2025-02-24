import type { Component, JSXElement } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';

const Container = styled.div({
  display: 'flex',
  gap: '2px',

  borderRadius: '6px',
  backgroundColor: vars.white,
  color: 'black',
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

type Props = {
  start: JSXElement;
  end: JSXElement;
};

export const Possible: Component<Props> = (props) => {
  return (
    <Container>
      <Start>{props.start}</Start>
      <Divider>{'/'}</Divider>
      <End> {props.end}</End>
    </Container>
  );
};
