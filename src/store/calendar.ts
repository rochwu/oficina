import {createStore, produce} from 'solid-js/store';
import {makePersisted} from '@solid-primitives/storage';

import {Calendar, Day, DayType, Ymd} from '../types';
import {doc, runTransaction, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase';
import {dayType, user} from './signals';

export const [calendar, setCalendar] = makePersisted(createStore<Calendar>({}));

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
    user(),
    'years',
    ymd.year.toString(),
    'months',
    ymd.month.toString(),
    'days',
    ymd.day.toString(),
  );
};

export const select = (ymd: Ymd) => {
  const {year, month, day} = ymd;
  const type = dayType();

  if (calendar[year]?.[month]?.[day]?.type === type) {
    return;
  }

  runTransaction(db, async (transaction) => {
    const dayRef = getDayRef(ymd);

    transaction.set(dayRef, {
      type,
      updated: serverTimestamp(),
    });
  }).catch((error) => {
    console.error('I fucked up selecting', error);
  });

  setCalendar(
    produce((calendar) => {
      // TODO: Add inability to replace not your type
      changeDay(calendar)(ymd, {type: dayType()});
    }),
  );
};

export const remove = (ymd: Ymd) => {
  runTransaction(db, async (transaction) => {
    const dayRef = getDayRef(ymd);

    transaction.set(dayRef, {
      updated: serverTimestamp(),
    });
  }).catch((error) => {
    console.error('I fucked up removing', error);
  });

  const {year, month, day} = ymd;

  setCalendar(
    produce((calendar) => {
      if (calendar[year]?.[month]?.[day]) {
        // TODO: Add inability to remove not your types
        delete calendar[year][month][day];
      }
    }),
  );
};
