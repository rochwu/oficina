const key = 'oficina-tutorial';

let done = !!localStorage.getItem(key);

export const tutorial = {
  needed: () => !done,
  done: () => {
    if (!done) {
      done = true;
      localStorage.setItem(key, '1');

      return;
    }
  },
  selectShownMs: 600, // Faster than this feels glitchy, higher than 700 seems laggy
};
