import {quarters} from '../constants';
import type {Qy} from '../types';

export const getYms = ({year, quarter}: Qy) => {
  const months = quarters[quarter];

  return months.map((month) => {
    return {
      month,
      // Quarter 4 of 2024 has January 2025
      year: month === 0 ? year + 1 : year,
    };
  });
};
