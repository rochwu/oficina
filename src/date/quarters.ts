import {quarters} from '../constants';
import {Quarter, Qy, Ym} from '../types';

export const getQuarter = (month: number) => {
  // Without Number, it becomes a string, and the comparison at `getQuarters` fucks up
  const keys = Object.keys(quarters).map((q) => Number(q)) as Quarter[];

  return keys.find((key) => {
    return quarters[key].some((m: number) => m === month);
  })!;
};

const getYms = ({year, quarter}: Qy) => {
  const months = quarters[quarter];

  return months.map((month) => {
    return {
      month,
      // Quarter 4 of 2024 has January 2025
      year: month === 0 ? year + 1 : year,
    };
  });
};

export const getQuarters = ({month, year}: Ym) => {
  const nowQ = getQuarter(month);

  const lastQ = ((nowQ + 3) % 4) as Quarter;
  const nextQ = ((nowQ + 1) % 4) as Quarter;

  return {
    last: {
      quarter: lastQ,
      yms: getYms({year: nowQ === 0 ? year - 1 : year, quarter: lastQ}),
    },
    now: {quarter: nowQ, yms: getYms({year, quarter: nowQ})},
    next: {
      quarter: nextQ,
      yms: getYms({year: nowQ === 3 ? year + 1 : year, quarter: nextQ}),
    },
  };
};
