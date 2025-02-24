import type {Accessor} from 'solid-js';
import {onCleanup, onMount} from 'solid-js';

/**
 * Stores snap points in case scroll snap finals, that I keep seeing in Chrome
 */
export const useIsSnapped = (ref: Accessor<HTMLDivElement>) => {
  // I just need basic grid coordinates
  const snapPoints = {top: new Set<number>(), left: new Set<number>()};

  const normalize = (n: number) => Math.abs(Math.trunc(n));

  onMount(() => {
    const observer = new ResizeObserver(() => {
      const children = document.querySelectorAll('[data-month]');

      children.forEach((child) => {
        const {top, left} = child.getBoundingClientRect();

        snapPoints.top.add(normalize(top));
        snapPoints.left.add(normalize(left));
      });
    });

    observer.observe(ref());

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return ({top, left}: Pick<DOMRect, 'top' | 'left'>) => {
    return (
      snapPoints.top.has(normalize(top)) && snapPoints.left.has(normalize(left))
    );
  };
};
