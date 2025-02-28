import { getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { createResource, lazy, Show } from 'solid-js';

import { app } from '../firebase/app';
import { setUser, user } from '../store';

const SignIn = lazy(async () => ({
  default: (await import('./SignIn')).SignIn,
}));

const auth = getAuth(app);

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
 */
export const SignInWithGoogle = () => {
  return (
    <Show when={isNotRedirect.state === 'ready' && !user()}>
      <SignIn />
    </Show>
  );
};

Object.defineProperty(window, 'oficina', {
  value: {
    signOut: auth.signOut,
  },
});
