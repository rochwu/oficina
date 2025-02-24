import {onSnapshot, runTransaction, serverTimestamp} from 'firebase/firestore';
import {createEffect} from 'solid-js';
import {produce} from 'solid-js/store';

import {changeDay} from './changeDay';
import {createCalendarStore} from './createCalendarStore';
import {getDayRef, getDaysRef, parseYmdDays} from './firebase';
import {db} from '../../firebase';
import type {Day, Ym, Ymd} from '../../types';
import {qs} from '../quarters';
import {dayType, user} from '../signals';
import {getDay} from './selectors';

export const [calendar, setCalendar] = createCalendarStore();

const saveDay = (ymd: Ymd) => {
  const save = (day: Day) => {
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
  };

  return {
    with: save,
  };
};

const onFirestore = (ym: Ym) => {
  return onSnapshot(getDaysRef(ym), (daysDocs) => {
    const ymdDays = parseYmdDays({...ym, docs: daysDocs});

    setCalendar(
      produce((calendar) => {
        ymdDays.forEach(({value: {type}, ...ymd}) => {
          changeDay(calendar).on(ymd).with({type});
        });
      }),
    );
  });
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

const hashYm = ({year, month}: Ym) => `${year}-${month}`;

// Pulled out to survive dev mode HMR
const subs = new Map<string, () => void>();

export const useCalendarFromServer = () => {
  // Done to optimize when the effect fires
  const quarters = (): ReturnType<typeof qs> | undefined => {
    if (user()) {
      return qs();
    }
  };

  createEffect(() => {
    const yms = Object.values(quarters() ?? {})
      .map((q) => q.yms)
      .flat();

    yms.forEach((ym) => {
      const hash = hashYm(ym);

      if (subs.has(hash)) {
        return;
      }

      const unsub = onFirestore(ym);

      subs.set(hash, unsub);
    });

    const newSubs = new Set(yms.map((ym) => hashYm(ym)));

    // Clean those that are leaving the viewport
    for (const [hash, unsub] of subs) {
      if (!newSubs.has(hash)) {
        unsub();
      }
    }
  });
};
