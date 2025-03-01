import type { Accessor } from 'solid-js';
import { createMemo } from 'solid-js';

import { calendar } from '../store';
import type { ByTypes, Ym } from '../types';

const createMonth = ({ year: y, month: m }: Ym) => {
  const month = createMemo(() => {
    const stored = calendar[y]?.[m] ?? {};

    return Object.entries(stored).reduce((result, [day, { type }]) => {
      if (Number.isNaN(day) || !type) {
        console.error('😱 corrupted save?!', y, m, day, type);
      }

      if (type === 'deleted') {
        return result;
      }

      result[type] ??= 0;
      result[type] += 1;

      return result;
    }, {} as ByTypes);
  });

  return month;
};

export const createSum = (yms: Accessor<Ym[]>) => {
  const months = () => {
    return yms().map(createMonth);
  };

  const sum = () => {
    return months().reduce((result, accessor) => {
      const data = accessor();

      for (const key in data) {
        const type = key as keyof typeof data;

        result[type] ??= 0;
        result[type] += data[type];
      }

      return result;
    }, {} as ByTypes);
  };

  return sum;
};
