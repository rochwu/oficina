import {untrack} from 'solid-js';
import {createStore, reconcile, unwrap} from 'solid-js/store';

import {getQuarter} from '../../date/quarters';
import {getYms} from '../../Q/getYms';
import type {Calendar} from '../../types';
import {createIndexedDb} from '../indexedDb';
import {today} from '../today';

type Local = {
  /**
   * The hash is used to clear localStorage on quarter change
   */
  [hash: string]: Calendar;
};

const meta = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const quarter = getQuarter(month);

  return {
    year,
    quarter,
    hash: `${year}-${quarter}`,
  };
};

/**
 * Only store the current month, based on today
 */
const createLocalStorage = () => {
  const key = 'oficina-calendar';

  const get = (): Calendar | undefined => {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Local;

      const {hash} = meta(untrack(today));

      return parsed[hash];
    } catch {}
  };

  const set = (calendar: Calendar) => {
    const {quarter, year, hash} = meta(untrack(today));

    const yms = getYms({year, quarter});

    let empty = true;

    const slice = yms.reduce((data, {year, month}) => {
      const value = calendar[year]?.[month];

      if (value) {
        empty = false;
        data[year] = {
          ...data[year],
          [month]: value,
        };
      }

      return data;
    }, {} as Calendar);

    if (empty) {
      localStorage.removeItem(key);
      return;
    }

    const raw: Local = {
      [hash]: slice,
    };

    localStorage.setItem(key, JSON.stringify(raw));
  };

  return {get, set};
};

/**
 * Taking a lot of ideas from @solid-primitives/storage makePersisted
 *
 * The only reason I had to made this is cuz makePersisted serializes IndexedDB to string
 * IndexedDB takes objects much better
 */
export const createCalendarStore = () => {
  const ls = createLocalStorage();
  const db = createIndexedDb('calendar');
  const store = createStore<Calendar>(ls.get() ?? {});

  const [storeProxy, setStore] = store;

  db.get().then((value) => {
    if (value) {
      /**
       * reconcile to merge value instead of straight up set
       */
      setStore(reconcile(value));
    }
  });

  const set = (...args: any[]) => {
    (setStore as any)(...args);

    /**
     * untrack makes `set` not a reactive signal
     * unwrap turns the proxy into a plain object
     */
    const calendar = unwrap(untrack(() => storeProxy));

    db.set(calendar);
    ls.set(calendar);
  };

  return [storeProxy, set] as typeof store;
};
