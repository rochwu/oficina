import { calendar } from './calendar';
import type { Ymd } from '../../types';

export const getDay = ({ year, month, day }: Ymd) => {
  return calendar[year]?.[month]?.[day];
};

/**
 * Gets DayType, not RawDayType
 */
export const getDayType = (ymd: Ymd) => {
  const maybe = getDay(ymd)?.type;

  if (!maybe || maybe === 'deleted') {
    return;
  }

  return maybe;
};
