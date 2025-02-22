import {collection, getDocs, writeBatch} from 'firebase/firestore';
import {user} from './signals';
import {db} from '../firebase';

const convert = async () => {
  if (!user()) {
    return;
  }

  const months = [1, 2, 3];

  const batch = writeBatch(db);

  for (const month of months) {
    const ref = collection(
      db,
      'calendars',
      user(),
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
