import type { JSXElement } from 'solid-js';
import { createContext, useContext } from 'solid-js';

import type { Quarter } from './types';

const DayContext = createContext(NaN);
const MonthContext = createContext(NaN);
const YearContext = createContext(NaN);
const QuarterContext = createContext<Quarter>();

export const DayProvider = (props: { children: JSXElement; day: number }) => {
  return (
    <DayContext.Provider value={props.day}>
      {props.children}
    </DayContext.Provider>
  );
};

export const MonthProvider = (props: {
  children: JSXElement;
  month: number;
}) => {
  return (
    <MonthContext.Provider value={props.month}>
      {props.children}
    </MonthContext.Provider>
  );
};

export const YearProvider = (props: { children: JSXElement; year: number }) => {
  return (
    <YearContext.Provider value={props.year}>
      {props.children}
    </YearContext.Provider>
  );
};

export const QuarterProvider = (props: {
  children: JSXElement;
  quarter: Quarter;
}) => {
  return (
    <QuarterContext.Provider value={props.quarter}>
      {props.children}
    </QuarterContext.Provider>
  );
};

export const useDay = () => useContext(DayContext);
export const useMonth = () => useContext(MonthContext);
export const useYear = () => useContext(YearContext);
export const useQuarter = () => useContext(QuarterContext);
