import {collection, getDocs} from 'firebase/firestore';
import {Day, Ymd} from '../types';
import {changeDay, setStore, store} from './store';
import {db} from '../firebase';
import {produce} from 'solid-js/store';

export const load = async (yms: Pick<Ymd, 'year' | 'month'>[]) => {
  const user = store.user;

  const promises = yms.map(async ({year, month}) => {
    const ref = collection(
      db,
      'calendars',
      user,
      'years',
      year.toString(),
      'months',
      month.toString(),
      'days',
    );

    const docs = await getDocs(ref);

    const ymds: (Ymd & {data: Day})[] = [];

    docs.forEach((doc) => {
      const data = doc.data() as Partial<Day>; // It has no type if deleted
      const day = Number(doc.id); // the key of the `days` collection

      if (data.type) {
        ymds.push({year, month, day, data: data as Day});
      }
    });

    return ymds;
  });

  const results = await Promise.all(promises);

  setStore(
    'calendar',
    produce((calendar) => {
      results.forEach((ymds) => {
        ymds.forEach(({data, ...ymd}) => {
          changeDay(calendar)(ymd, data);
        });
      });
    }),
  );
};
