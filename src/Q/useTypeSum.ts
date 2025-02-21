import {createMemo} from 'solid-js';
import {store} from '../store';
import {Ym} from '../types';
import {ByTypes} from './types';

export const useTypeSum = (yms: Ym[]) => {
  const accessors = yms.map(({year, month}) =>
    createMemo(() => {
      const stored = store.calendar[year]?.[month] ?? {};

      return Object.values(stored).reduce<ByTypes>(
        (results, {type}) => {
          results[type] += 1;

          return results;
        },
        {
          wfo: 0,
          pto: 0,
          holiday: 0,
        },
      );
    }),
  );

  return createMemo(() => {
    return accessors.reduce<ByTypes>(
      (result, accessor) => {
        const {wfo, pto, holiday} = accessor();

        result.wfo += wfo;
        result.pto += pto;
        result.holiday += holiday;

        return result;
      },
      {
        wfo: 0,
        pto: 0,
        holiday: 0,
      },
    );
  });
};
