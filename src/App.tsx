import type {Component} from 'solid-js';
import {SignInWithGoogle} from './SignInWithGoogle';
import {styled} from 'solid-styled-components';
import {GlobalStyles} from './css';
import {TypeSelect} from './TypeSelect';
import {quarters} from './constants';
import {Q} from './Q';
import {today} from './store';

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

// I did something extra to be type safe, except getMonth() isn't type 0-11
const getQuarter = (month: number) => {
  const keys = Object.keys(quarters) as unknown as (keyof typeof quarters)[];

  return keys.find((key) => {
    return quarters[key].some((m) => m === month);
  })!;
};

export const App: Component = () => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Q
          quarter={getQuarter(today().getMonth())}
          year={today().getFullYear()}
        />
        <TypeSelect />
        <SignInWithGoogle />
      </Container>
    </>
  );
};
