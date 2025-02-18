import type {Component} from 'solid-js';
import {SignInWithGoogle} from './SignInWithGoogle';
import {styled} from 'solid-styled-components';
import {Month} from './Month';
import {GlobalStyles} from './css';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  flexDirection: 'column',

  // Small tablet
  maxHeight: '900px',
  maxWidth: '600px',
  height: '100%',
  width: '100%',
});

const today = new Date();

export const App: Component = () => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <SignInWithGoogle />
        <Month month={today.getMonth()} year={today.getFullYear()} />{' '}
      </Container>
    </>
  );
};
