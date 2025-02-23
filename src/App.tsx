import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {GlobalStyles} from './css';
import {Qs} from './Qs';
import {SignInWithGoogle} from './SignInWithGoogle';
import {TypeSelect} from './TypeSelect';

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

export const App: Component = () => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Qs />
        <TypeSelect />
        <SignInWithGoogle />
      </Container>
    </>
  );
};
