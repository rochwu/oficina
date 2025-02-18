import {createStore, produce} from 'solid-js/store';

import {Calendar, DayType, Ymd} from '../types';

type State = {
  type: DayType;
  calendar: Calendar;
  user: string;
};

export const [store, setStore] = createStore<State>({
  type: 'wfo',
  calendar: {},
  user: '',
});

// TODO: Merge with local storage when offline
export const load = () => {};

export const select = ({year, month, day}: Ymd) => {
  setStore(
    'calendar',
    produce((calendar) => {
      calendar[year] ??= {};
      calendar[year][month] ??= {};
      calendar[year][month][day] = {
        type: store.type,
      };
    }),
  );
};

export const remove = ({year, month, day}: Ymd) => {
  setStore(
    'calendar',
    produce((calendar) => {
      if (calendar[year][month][day]) {
        delete calendar[year][month][day];
      }
    }),
  );
};
