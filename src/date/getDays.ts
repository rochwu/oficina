export const getDays = ({year, month}: {year: number; month: number}) => {
  // month + 1 = next month
  // day = 0 = last day of previous month
  const date = new Date(year, month + 1, 0);

  return date.getDate();
};
