import {onSnapshot, runTransaction, serverTimestamp} from 'firebase/firestore';
import {createStore, produce} from 'solid-js/store';

import {db} from '../firebase';
import type {Calendar, Day, Ym, Ymd} from '../types';
import {getDayRef, getDaysRef, parseYmdDays} from './firebase';
import {persist} from './indexedDb';
import {dayType, user} from './signals';

export const [calendar, setCalendar] = persist(createStore<Calendar>({}));

const changeDay = (draft: Calendar) => {
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

const saveDay = (ymd: Ymd) => {
  return {
    with: (day: Day) => {
      const {type} = day;

      if (user()) {
        runTransaction(db, async (transaction) => {
          const dayRef = getDayRef(ymd);

          transaction.set(dayRef, {
            type,
            updated: serverTimestamp(),
          });
        }).catch((error) => {
          console.error('🤬 I fucked up saving', type, error);
        });
      }

      setCalendar(
        produce((calendar) => {
          changeDay(calendar).on(ymd).with({type});
        }),
      );
    },
  };
};

export const select = (ymd: Ymd) => {
  const type = dayType();

  if (getDay(ymd)?.type === type) {
    return;
  }

  saveDay(ymd).with({type});
};

export const remove = (ymd: Ymd) => {
  const type = getDay(ymd)?.type;

  if (!type || type === 'deleted') {
    return;
  }

  saveDay(ymd).with({type: 'deleted'});
};

export const onLoad = (yms: Ym[]) => {
  const unsubs = yms.map((ym) => {
    return onSnapshot(getDaysRef(ym), (daysDocs) => {
      const ymdDays = parseYmdDays({...ym, docs: daysDocs});

      setCalendar(
        produce((calendar) => {
          ymdDays.forEach(({value, ...ymd}) => {
            changeDay(calendar).on(ymd).with(value);
          });
        }),
      );
    });
  });

  return () => {
    unsubs.forEach((unsub) => unsub());
  };
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
