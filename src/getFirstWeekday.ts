/**
 * Sunday is 0
 */
export const getFirstWeekday = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const date = new Date(year, month, 1);

  return date.getDay();
};
