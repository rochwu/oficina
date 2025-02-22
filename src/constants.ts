export const today = new Date();

export const todayDataAttribute = 'data-today';

export const quarters = {
  0: [1, 2, 3],
  1: [4, 5, 6],
  2: [7, 8, 9],
  3: [10, 11, 0],
} as const;

export const removeDelayMs = 350; // Just felt right

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((m) => m.substring(0, 4)); // Thought it'd be funny to be wonky 🤷‍♂️
