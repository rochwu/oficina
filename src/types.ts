// `deleted` is a special type to help firestore handle merges easier
export type RawDayType = 'wfo' | 'pto' | 'sick' | 'holiday' | 'deleted';

export type DayType = Exclude<RawDayType, 'deleted'>;

export type Day = {
  type: RawDayType;
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

export type YmdDay = Ymd & {
  value: Day;
};
