import './google.css';

import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import { createResource, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';
import { app } from '../firebase/app';
import { setUser, user } from '../store';
import html from './google.html?raw';

const Position = styled.div({
  position: 'absolute',
  top: vars.gap,
  right: vars.gap,
  padding: vars.gap, // This luckily makes it fit at the select
});

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Listen for changes in authentication state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.warn('😳 no user');
    return;
  }

  const id = user.uid; // firebase unique Id
  setUser(id);

  if (import.meta.env.MODE !== 'production') {
    console.log(`✅ logged in ${id}`);
  }
});

const [isNotRedirect] = createResource(() => getRedirectResult(auth));

/**
 * To SignInWithGoogle a fuckton of shit had to happen and I think I can refine it
 *
 * Firebase authDomain is set to `rolando.ooo/oficina` which then we need
 * Cloudflare to redirect `rolando.ooo/oficina/__/auth/handler` to `dame-follow.firebaseapp.com/__/auth/handler`
 * Cloud Console OAuth to have `rolando.ooo/oficina/__/auth/handler` as an authorized redirect URL
 * Firebase Hosting to host the auth files, this is auto available by Firebase
 *
 * Get the button html and css https://developers.google.com/identity/branding-guidelines
 */
export const SignInWithGoogle = () => {
  const signIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <Show when={isNotRedirect.state === 'ready' && !user()}>
      {/* eslint-disable-next-line solid/no-innerhtml */}
      <Position innerHTML={html} onClick={signIn} />
    </Show>
  );
};
