import type {Ym} from '../types';

export const getWeekdaysRemaining = ({from, to}: {from: Date; to: Ym}) => {
  const start = new Date(from);
  const end = new Date(to.year, to.month + 1, 0); // Last day of the month
  let count = 0;

  while (start <= end) {
    const day = start.getDay(); // 0 = Sunday, 6 = Saturday
    if (day >= 1 && day <= 5) {
      // Monday to Friday
      count++;
    }
    start.setDate(start.getDate() + 1); // Move to next day
  }

  return count;
};
