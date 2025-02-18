/// <reference types="@types/google.accounts" />

import {Component, onMount} from 'solid-js';
import {styled} from 'solid-styled-components';
import {decodeJwt} from 'jose';
import {setStore} from './store';

const callback = async (response: google.accounts.id.CredentialResponse) => {
  const credential = response.credential;

  if (!credential) {
    console.error('❌ bad login');
    return;
  }

  // sub is the unique ID Google assigns to all accounts
  const {sub} = decodeJwt(credential);

  if (!sub) {
    console.error('❌ bad login token');
    return;
  }

  setStore('user', sub);
};

const Position = styled.div({
  position: 'absolute',
  right: '0.5em',
  top: '0.5em',
});

const hasGoogle = () => window.hasOwnProperty('google');

export const SignInWithGoogle: Component = () => {
  let ref: HTMLDivElement = undefined as never;

  onMount(() => {
    const connect = () => {
      if (!hasGoogle() || !ref) {
        requestAnimationFrame(connect);
        return;
      }

      google.accounts.id.initialize({
        client_id:
          '992894988444-03batc8rrh8ksoq38dp0omfap3aopds5.apps.googleusercontent.com',
        callback,
      });

      google.accounts.id.renderButton(ref, {
        type: 'icon',
        shape: 'circle',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
      });
    };

    connect();
  });

  return <Position ref={ref} />;
};
