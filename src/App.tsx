import type {Component} from 'solid-js';
import {SignInWithGoogle} from './SignInWithGoogle';
import {styled} from 'solid-styled-components';
import {Month} from './Month';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  flexDirection: 'column',
});

const today = new Date();

export const App: Component = () => {
  return (
    <Container>
      <SignInWithGoogle />
      <Month month={today.getMonth()} year={today.getFullYear()} />
    </Container>
  );
};
