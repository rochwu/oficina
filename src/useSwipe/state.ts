import {MutableRefObject} from 'react';

import type {Swipe} from './types';

type Callback = MutableRefObject<Swipe.Handler>;

// "state" lol, global variables
const subscribers: Callback[] = [];

export const unsubscribe = (callback: Callback) => {
  const found = subscribers.indexOf(callback);
  subscribers.splice(found, 1);
};

/**
 * Returns unsubscribe function
 */
export const subscribe = (callback: Callback) => {
  subscribers.push(callback);

  return () => unsubscribe(callback);
};

export const withoutSubscribers = (method: () => void) => {
  if (!subscribers.length) {
    method();
  }
};

export const notifySubscribers = (direction: Swipe.Action) => {
  subscribers.forEach((subscriber) => subscriber.current(direction));
};
