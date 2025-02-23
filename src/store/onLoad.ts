import {onSnapshot} from 'firebase/firestore';
import {produce} from 'solid-js/store';

import type {Ym} from '../types';
import {changeDay, setCalendar} from './calendar';
import {getDaysRef, parseYmdDays} from './firebase';

export const onLoad = (yms: Ym[]) => {
  const unsubs = yms.map((ym) => {
    return onSnapshot(getDaysRef(ym), (daysDocs) => {
      const ymdDays = parseYmdDays({...ym, docs: daysDocs});

      setCalendar(
        produce((calendar) => {
          ymdDays.forEach(({value, ...ymd}) => {
            changeDay(calendar)(ymd, value);
          });
        }),
      );
    });
  });

  return () => {
    unsubs.forEach((unsub) => unsub());
  };
};
