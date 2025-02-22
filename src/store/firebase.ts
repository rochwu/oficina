import {collection, DocumentData, QuerySnapshot} from 'firebase/firestore';
import {db} from '../firebase';
import {Day, Ym, YmdDay} from '../types';
import {user} from './signals';

export const getDaysRef = ({year, month}: Ym) => {
  return collection(
    db,
    'calendars',
    user(),
    'years',
    year.toString(),
    'months',
    month.toString(),
    'days',
  );
};

export const parseYmdDays = ({
  year,
  month,
  docs,
}: {
  docs: QuerySnapshot<DocumentData, DocumentData>;
} & Ym) => {
  const ymdDays: YmdDay[] = [];

  docs.forEach((doc) => {
    const {type} = doc.data() as Day; // It has no type if deleted
    const day = Number(doc.id); // the key of the `days` collection

    ymdDays.push({year, month, day, value: {type}});
  });

  return ymdDays;
};
