export type DayType = 'wfo' | 'pto' | 'sick' | 'holiday';

export type Day = {
  type: DayType;
};

export type ByTypes = Record<DayType, number>;

export type Month = Record<number, Day>;

export type Year = Record<number, Month>;

export type Calendar = Record<number, Year>;

export type Ymd = {
  year: number;
  month: number;
  day: number;
};

export type Ym = Pick<Ymd, 'year' | 'month'>;
