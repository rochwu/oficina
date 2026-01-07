import { quarters } from '../constants';
import type { Quarter, Qy, Ym } from '../types';

export const getQuarter = (month: number) => {
  // Without Number, it becomes a string, and the comparison at `getQuarters` fucks up
  const keys = Object.keys(quarters).map((q) => Number(q)) as Quarter[];

  return keys.find((key) => {
    return quarters[key].some((m: number) => m === month);
  })!;
};

export const getYms = ({ year, quarter }: Qy) => {
  const months = quarters[quarter];

  return months.map((month) => {
    return {
      month,
      // Quarter 4 of 2024 has January 2025
      year: month === 0 ? year + 1 : year,
    };
  });
};

export const getQuarters = ({ month, year }: Ym) => {
  const nowQ = getQuarter(month);

  const lastQ = ((nowQ + 3) % 4) as Quarter;
  const nextQ = ((nowQ + 1) % 4) as Quarter;

  return {
    last: {
      quarter: lastQ,
      yms: getYms({
        /**
         * Q0 ie: Feb, Mar, Apr; previous Q3 has Nov, Dec in the previous year
         * Jan in Q3 has previous Q2 in the previous year
         */
        year: nowQ === 0 || month === 0 ? year - 1 : year,
        quarter: lastQ,
      }),
    },
    now: {
      quarter: nowQ,
      /**
       * getYms +1 the year for Q3's Jan, so we minus 1 to normalize
       */
      yms: getYms({ year: month === 0 ? year - 1 : year, quarter: nowQ }),
    },
    next: {
      quarter: nextQ,
      yms: getYms({
        /**
         * Q3 ie: Nov, Dec, Jan; Nov and Dec have next Q0 in the next year
         * Jan in Q3 is the same year as the next
         */
        year: nowQ === 3 && month !== 0 ? year + 1 : year,
        quarter: nextQ,
      }),
    },
  };
};
