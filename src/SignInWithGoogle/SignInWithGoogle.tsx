import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import {Component, createResource, onMount, Show} from 'solid-js';
import {app} from '../firebase/app';
import {setStore, store} from '../store';
import {styled} from 'solid-styled-components';
import {vars} from '../css';
import './google.css';
import html from './google.html?raw';

const Position = styled.div({
  position: 'absolute',
  top: vars.gap,
  right: vars.gap,
});

/**
 * To SignInWithGoogle a fuckton of shit had to happen and I think I can refine it
 *
 * Firebase authDomain is set to `rolando.ooo/oficina` which then we need
 * Cloudflare to redirect `rolando.ooo/oficina/__/auth/handler` to `dame-follow.firebaseapp.com/__/auth/handler`
 * Cloud Console OAuth to have `rolando.ooo/oficina/__/auth/handler` as an authorized redirect URL
 * Firebase Hosting to host the auth files, this is auto available by Firebase
 */
export const SignInWithGoogle: Component = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithRedirect(auth, provider);
  };

  onMount(async () => {
    // Listen for changes in authentication state
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.warn('😳 no user');
        return;
      }

      const id = user.uid; // firebase unique Id
      setStore('user', id);

      if (import.meta.env.MODE !== 'production') {
        console.log(`✅ logged in ${id}`);
      }
    });
  });

  const [isNotRedirect] = createResource(() => getRedirectResult(auth));

  const isNotUser = () => !store.user;

  return (
    <Show when={isNotRedirect.state === 'ready' && isNotUser()}>
      <Position innerHTML={html} onClick={signIn} />
    </Show>
  );
};
