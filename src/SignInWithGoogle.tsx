/// <reference types="@types/google.accounts" />

import {Component, onMount} from 'solid-js';
import {styled} from 'solid-styled-components';

const callback = (response: google.accounts.id.CredentialResponse) => {
  console.log(response);
};

const Position = styled.div({
  position: 'absolute',
  right: '0',
  top: '0',
});

export const SignInWithGoogle: Component = () => {
  let ref: HTMLDivElement = undefined as never;

  onMount(() => {
    const connect = () => {
      if (!google || !ref) {
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
