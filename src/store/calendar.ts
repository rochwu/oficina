import {makePersisted} from '@solid-primitives/storage';
import {runTransaction, serverTimestamp} from 'firebase/firestore';
import {createStore, produce} from 'solid-js/store';

import {db} from '../firebase';
import type {Calendar, Day, Ymd} from '../types';
import {getDayRef} from './firebase';
import {indexDb} from './indexDb';
import {dayType, user} from './signals';

export const [calendar, setCalendar] = makePersisted(
  createStore<Calendar>({}),
  {
    storage: indexDb,
  },
);

export const changeDay =
  (draft: Calendar) =>
  ({year, month, day}: Ymd, change: Day) => {
    draft[year] ??= {};
    draft[year][month] ??= {};
    draft[year][month][day] = change;
  };

export const select = (ymd: Ymd) => {
  const type = dayType();

  if (getDay(ymd)?.type === type) {
    return;
  }

  if (user()) {
    runTransaction(db, async (transaction) => {
      const dayRef = getDayRef(ymd);

      transaction.set(dayRef, {
        type,
        updated: serverTimestamp(),
      });
    }).catch((error) => {
      console.error('🤬 I fucked up selecting', error);
    });
  }

  setCalendar(
    produce((calendar) => {
      changeDay(calendar)(ymd, {type: dayType()});
    }),
  );
};

export const remove = (ymd: Ymd) => {
  const type = getDay(ymd)?.type;

  if (!type || type === 'deleted') {
    return;
  }

  if (user()) {
    runTransaction(db, async (transaction) => {
      const dayRef = getDayRef(ymd);

      transaction.set(dayRef, {
        type: 'deleted',
        updated: serverTimestamp(),
      });
    }).catch((error) => {
      console.error('🤬 I fucked up removing', error);
    });
  }

  setCalendar(
    produce((calendar) => {
      changeDay(calendar)(ymd, {type: 'deleted'});
    }),
  );
};

export const getDay = ({year, month, day}: Ymd) => {
  return calendar[year]?.[month]?.[day];
};

/**
 * Gets DayType, not RawDayType
 */
export const getDayType = (ymd: Ymd) => {
  const maybe = getDay(ymd)?.type;

  if (!maybe || maybe === 'deleted') {
    return;
  }

  return maybe;
};
