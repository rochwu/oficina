import './google.css';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { styled } from 'solid-styled-components';

import { vars } from '../css';
import html from './google.html?raw';
import { app } from '../firebase/app';

const Position = styled.div({
  position: 'absolute',
  top: vars.gap,
  right: vars.gap,
  padding: vars.gap, // This luckily makes it fit at the select
});

/**
 * I split this so that it can be chunked
 *
 * Get the button html and css https://developers.google.com/identity/branding-guidelines
 */
export const SignIn = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    if (import.meta.env.MODE !== 'production') {
      // signInWithRedirect doesn't seem to work on dev mode, while popup does
      signInWithPopup(auth, provider);
      return;
    }

    signInWithRedirect(auth, provider);
  };

  // eslint-disable-next-line solid/no-innerhtml
  return <Position innerHTML={html} onClick={signIn} />;
};
