import type {Calendar, Day, Ymd} from '../../types';

export const changeDay = (draft: Calendar) => {
  return {
    on: ({year, month, day}: Ymd) => {
      draft[year] ??= {};
      draft[year][month] ??= {};

      return {
        with: (change: Day) => {
          draft[year]![month]![day] = change;
        },
      };
    },
  };
};
