import type { Ym } from '../types';
import { getDays } from './getDays';
import { getFirstDayOfWeek } from './getFirstDayOfWeek';

export const getWeekdays = (ym: Ym) => {
  const firstDay = getFirstDayOfWeek(ym);
  const daysInMonth = getDays(ym);

  // Calculate complete weeks
  const fullWeeks = Math.floor(daysInMonth / 7) * 5; // Each full week has 5 weekdays

  // Calculate remaining days and count their weekdays
  let extraWeekdays = 0;
  for (let i = 0; i < daysInMonth % 7; i++) {
    const currentDay = (firstDay + i) % 7;
    if (currentDay >= 1 && currentDay <= 5) {
      extraWeekdays++;
    }
  }

  return fullWeeks + extraWeekdays;
};
