import {createMemo} from 'solid-js';

import {calendar} from '../store';
import type {Ym, ByTypes} from '../types';

export const useTypeSum = (yms: Ym[]) => {
  const accessors = yms.map(({year, month}) =>
    createMemo(() => {
      const stored = calendar[year]?.[month] ?? {};

      return Object.entries(stored).reduce((result, [day, {type}]) => {
        if (Number.isNaN(day) || !type) {
          console.error('😱 corrupted save?!', year, month, day, type);
        }

        if (type === 'deleted') {
          return result;
        }

        result[type] ??= 0;
        result[type] += 1;

        return result;
      }, {} as ByTypes);
    }),
  );

  return createMemo(() => {
    return accessors.reduce((result, accessor) => {
      const data = accessor();

      Object.keys(data).forEach((key) => {
        const type = key as keyof typeof result;

        result[type] ??= 0;
        result[type] += data[type];
      });

      return result;
    }, {} as ByTypes);
  });
};
