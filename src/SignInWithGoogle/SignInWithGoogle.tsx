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
        console.warn('🤔 user logged out');
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

  const isNotUser = () => !!store.user;

  return (
    <Show when={isNotRedirect.state === 'ready' && isNotUser()}>
      <Position innerHTML={html} onClick={signIn} />
    </Show>
  );
};
