import type {Component} from 'solid-js';
import {SignInWithGoogle} from './SignInWithGoogle';
import {styled} from 'solid-styled-components';
import {GlobalStyles} from './css';
import {TypeSelect} from './TypeSelect';
import {quarters, today} from './constants';
import {Q} from './Q';

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

const getQuarter = (month: number) => {
  return quarters.findIndex((quarter) => quarter.find((m) => m === month));
};

export const App: Component = () => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Q quarter={getQuarter(today.getMonth())} year={today.getFullYear()} />
        <TypeSelect />
        <SignInWithGoogle />
      </Container>
    </>
  );
};
