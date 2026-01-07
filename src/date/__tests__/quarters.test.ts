import { expect, test } from 'vitest';

import { getQuarters } from '../quarters';

test.each([
  {
    month: 0, // Verify previous and current year is last year if Jan
    year: 1000,
    expected: {
      last: {
        quarter: 2,
        yms: [
          { month: 7, year: 999 },
          { month: 8, year: 999 },
          { month: 9, year: 999 },
        ],
      },
      now: {
        quarter: 3,
        yms: [
          { month: 10, year: 999 },
          { month: 11, year: 999 },
          { month: 0, year: 1000 }, // Today
        ],
      },
      next: {
        quarter: 0,
        yms: [
          { month: 1, year: 1000 },
          { month: 2, year: 1000 },
          { month: 3, year: 1000 },
        ],
      },
    },
  },
  {
    month: 1, // Verify previous is last year
    year: 1000,
    expected: {
      last: {
        quarter: 3,
        yms: [
          { month: 10, year: 999 },
          { month: 11, year: 999 },
          { month: 0, year: 1000 },
        ],
      },
      now: {
        quarter: 0,
        yms: [
          { month: 1, year: 1000 }, // Today
          { month: 2, year: 1000 },
          { month: 3, year: 1000 },
        ],
      },
      next: {
        quarter: 1,
        yms: [
          { month: 4, year: 1000 },
          { month: 5, year: 1000 },
          { month: 6, year: 1000 },
        ],
      },
    },
  },
  {
    month: 6, // Happy + vanilla
    year: 1000,
    expected: {
      last: {
        quarter: 0,
        yms: [
          { month: 1, year: 1000 },
          { month: 2, year: 1000 },
          { month: 3, year: 1000 },
        ],
      },
      now: {
        quarter: 1,
        yms: [
          { month: 4, year: 1000 },
          { month: 5, year: 1000 },
          { month: 6, year: 1000 }, // Today
        ],
      },
      next: {
        quarter: 2,
        yms: [
          { month: 7, year: 1000 },
          { month: 8, year: 1000 },
          { month: 9, year: 1000 },
        ],
      },
    },
  },
  {
    month: 8, // Verify next quarter's Jan is next year
    year: 1000,
    expected: {
      last: {
        quarter: 1,
        yms: [
          { month: 4, year: 1000 },
          { month: 5, year: 1000 },
          { month: 6, year: 1000 },
        ],
      },
      now: {
        quarter: 2,
        yms: [
          { month: 7, year: 1000 },
          { month: 8, year: 1000 }, // Today
          { month: 9, year: 1000 },
        ],
      },
      next: {
        quarter: 3,
        yms: [
          { month: 10, year: 1000 },
          { month: 11, year: 1000 },
          { month: 0, year: 1001 },
        ],
      },
    },
  },
  {
    month: 11, // Verify Jan and next quarter is next year
    year: 1000,
    expected: {
      last: {
        quarter: 2,
        yms: [
          { month: 7, year: 1000 },
          { month: 8, year: 1000 },
          { month: 9, year: 1000 },
        ],
      },
      now: {
        quarter: 3,
        yms: [
          { month: 10, year: 1000 },
          { month: 11, year: 1000 }, // Today
          { month: 0, year: 1001 },
        ],
      },
      next: {
        quarter: 0,
        yms: [
          { month: 1, year: 1001 },
          { month: 2, year: 1001 },
          { month: 3, year: 1001 },
        ],
      },
    },
  },
])('getQuarters $month $year', ({ month, year, expected }) => {
  const quarters = getQuarters({ month, year });

  expect(quarters).toEqual(expected);
});
