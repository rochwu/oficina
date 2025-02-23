import {collection, getDocs, writeBatch} from 'firebase/firestore';

import {db} from '../firebase';
import {user} from './signals';

const convert = async () => {
  const key = user();

  if (!key) {
    return;
  }

  const months = [1, 2, 3];

  const batch = writeBatch(db);

  for (const month of months) {
    const ref = collection(
      db,
      'calendars',
      key,
      'years',
      '2025',
      'months',
      month.toString(),
      'days',
    );

    const docs = await getDocs(ref);

    docs.forEach((doc) => {
      const day = doc.data();

      if (!day.type) {
        batch.delete(doc.ref);
      }
    });
  }

  await batch.commit();

  alert('✅ converted');
};

export const Conversion = () => {
  return <button onClick={convert}>R U N </button>;
};
