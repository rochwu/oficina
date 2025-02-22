import {makePersisted} from '@solid-primitives/storage';
import {createStore, produce} from 'solid-js/store';

import {runTransaction, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase';
import {Calendar, Day, Ymd} from '../types';
import {getDayRef} from './firebase';
import {dayType} from './signals';

export const [calendar, setCalendar] = makePersisted(createStore<Calendar>({}));

export const changeDay =
  (calendar: Calendar) =>
  ({year, month, day}: Ymd, change: Day) => {
    calendar[year] ??= {};
    calendar[year][month] ??= {};
    calendar[year][month][day] = change;
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
    console.error('🤬 I fucked up selecting', error);
  });

  setCalendar(
    produce((calendar) => {
      changeDay(calendar)(ymd, {type: dayType()});
    }),
  );
};

export const remove = (ymd: Ymd) => {
  const {year, month, day} = ymd;

  const type = calendar[year]?.[month]?.[day]?.type;

  if (!type || type === 'deleted') {
    console.error('🤷‍♂️ deleting nothing, how?!');
    return;
  }

  runTransaction(db, async (transaction) => {
    const dayRef = getDayRef(ymd);

    transaction.set(dayRef, {
      type: 'deleted',
      updated: serverTimestamp(),
    });
  }).catch((error) => {
    console.error('🤬 I fucked up removing', error);
  });

  setCalendar(
    produce((calendar) => {
      changeDay(calendar)(ymd, {type: 'deleted'});
    }),
  );
};

/**
 * Gets DayType, not RawDayType
 */
export const getDayType = ({year, month, day}: Ymd) => {
  const maybe = calendar[year]?.[month]?.[day]?.type;

  if (!maybe || maybe === 'deleted') {
    return;
  }

  return maybe;
};
