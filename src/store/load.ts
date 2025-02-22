import {collection, getDocs} from 'firebase/firestore';
import {Day, Ym, Ymd} from '../types';
import {changeDay, setCalendar} from './calendar';
import {db} from '../firebase';
import {produce} from 'solid-js/store';
import {user} from './signals';

/**
 * Only call if `user` is set
 */
export const load = async (yms: Ym[]) => {
  const promises = yms.map(async ({year, month}) => {
    const ref = collection(
      db,
      'calendars',
      user(),
      'years',
      year.toString(),
      'months',
      month.toString(),
      'days',
    );

    const docs = await getDocs(ref);

    const ymds: (Ymd & {data: Day})[] = [];

    docs.forEach((doc) => {
      const {type} = doc.data() as Partial<Day>; // It has no type if deleted
      const day = Number(doc.id); // the key of the `days` collection

      if (type) {
        // Only storing type, even when FS has timestamps to relax localStorage
        ymds.push({year, month, day, data: {type}});
      }
    });

    return ymds;
  });

  const results = await Promise.all(promises);

  setCalendar(
    produce((calendar) => {
      results.forEach((ymds) => {
        ymds.forEach(({data, ...ymd}) => {
          changeDay(calendar)(ymd, data);
        });
      });
    }),
  );
};
