/**
 * Sunday is 0
 */
export const getFirstDayOfWeek = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const date = new Date(year, month, 1);

  return date.getDay();
};
