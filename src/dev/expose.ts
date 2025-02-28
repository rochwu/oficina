import { getAuth } from 'firebase/auth';

import { app } from '../firebase/app';
import { db } from '../store/calendar/createCalendarStore';

declare global {
  interface Window {
    oficina: {
      clearLocalWfo: () => void;
      signOut: () => void;
    };
  }
}

type Anything = Record<string, any>;

export const expose = () => {
  const auth = getAuth(app);

  window.oficina ??= {
    signOut: auth.signOut,
  } as never;

  // Real dev mode only
  if (import.meta.env.MODE !== 'production') {
    const clearWfo = (anything: Anything) => {
      if ('type' in anything) {
        return anything.type === 'wfo' ? undefined : anything;
      }

      return Object.entries(anything).reduce((next, [key, value]) => {
        const attempt = clearWfo(value);

        if (attempt) {
          next[key] = attempt;
        }

        return next;
      }, {} as Anything);
    };

    window.oficina.clearLocalWfo = () => {
      // Get the keys at createCalendarStore
      const lsKey = 'oficina-calendar';
      const ls = localStorage.getItem(lsKey);

      if (ls) {
        const calendar = JSON.parse(ls);
        localStorage.setItem(lsKey, JSON.stringify(clearWfo(calendar)));
      }

      db.delete();

      console.log('🗑️ all storage wfo cleared, refresh');
    };
  }
};
