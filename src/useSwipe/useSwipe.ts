import {useEffect, useRef} from 'react';

import {handleTouchStart, handleTouchMove, handleTouchEnd} from './handleTouch';
import {throttledHandleWheel} from './handleWheel';
import {isTouchable} from './isTouchable';
import {subscribe, withoutSubscribers} from './state';
import type {Swipe} from './types';

export const useSwipe = (handler: Swipe.Handler) => {
  const callback = useRef(handler);

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  useEffect(() => {
    withoutSubscribers(() => {
      document.addEventListener('wheel', throttledHandleWheel);

      if (isTouchable) {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
      }
    });

    const unsubscribe = subscribe(callback);

    return () => {
      unsubscribe();

      withoutSubscribers(() => {
        document.removeEventListener('wheel', throttledHandleWheel);

        if (isTouchable) {
          document.removeEventListener('touchstart', handleTouchStart);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        }
      });
    };
  }, []);
};
