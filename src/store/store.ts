import {createStore, produce} from 'solid-js/store';

import {Calendar, Day, DayType, Ymd} from '../types';
import {doc, runTransaction, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase';

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

export const changeDay =
  (calendar: Calendar) =>
  ({year, month, day}: Ymd, change: Day) => {
    calendar[year] ??= {};
    calendar[year][month] ??= {};
    calendar[year][month][day] = change;
  };

const getDayRef = (ymd: Ymd) => {
  return doc(
    db,
    'calendars',
    store.user,
    'years',
    ymd.year.toString(),
    'months',
    ymd.month.toString(),
    'days',
    ymd.day.toString(),
  );
};

export const select = async (ymd: Ymd) => {
  try {
    await runTransaction(db, async (transaction) => {
      const dayRef = getDayRef(ymd);

      transaction.set(dayRef, {
        type: store.type,
        updated: serverTimestamp(),
      });
    });
  } catch (error) {
    console.error('I fucked up selecting', error);
  }

  setStore(
    'calendar',
    produce((calendar) => {
      // TODO: Add inability to replace not your type
      changeDay(calendar)(ymd, {type: store.type});
    }),
  );
};

export const remove = async (ymd: Ymd) => {
  try {
    await runTransaction(db, async (transaction) => {
      const dayRef = getDayRef(ymd);

      transaction.set(dayRef, {
        updated: serverTimestamp(),
      });
    });
  } catch (error) {
    console.error('I fucked up removing', error);
  }

  const {year, month, day} = ymd;

  setStore(
    'calendar',
    produce((calendar) => {
      if (calendar[year]?.[month]?.[day]) {
        // TODO: Add inability to remove not your types
        delete calendar[year][month][day];
      }
    }),
  );
};
