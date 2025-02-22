import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import {Component, createResource, onMount, Show} from 'solid-js';
import {styled} from 'solid-styled-components';
import {vars} from '../css';
import {app} from '../firebase/app';
import {setUser, user} from '../store';
import './google.css';
import html from './google.html?raw';

const Position = styled.div({
  position: 'absolute',
  top: vars.gap,
  right: vars.gap,
  padding: vars.gap, // This luckily makes it fit at the select
});

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
      setUser(id);

      if (import.meta.env.MODE !== 'production') {
        console.log(`✅ logged in ${id}`);
      }
    });
  });

  const [isNotRedirect] = createResource(() => getRedirectResult(auth));

  return (
    <Show when={isNotRedirect.state === 'ready' && !user()}>
      <Position innerHTML={html} onClick={signIn} />
    </Show>
  );
};
