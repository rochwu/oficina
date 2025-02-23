import type {Component, JSXElement} from 'solid-js';
import {createContext, useContext} from 'solid-js';

import type {Quarter} from './types';

const DayContext = createContext(NaN);
const MonthContext = createContext(NaN);
const YearContext = createContext(NaN);
const QuarterContext = createContext(NaN);

export const DayProvider: Component<{children: JSXElement; day: number}> = (
  props,
) => {
  return (
    <DayContext.Provider value={props.day}>
      {props.children}
    </DayContext.Provider>
  );
};

export const MonthProvider: Component<{children: JSXElement; month: number}> = (
  props,
) => {
  return (
    <MonthContext.Provider value={props.month}>
      {props.children}
    </MonthContext.Provider>
  );
};

export const YearProvider: Component<{children: JSXElement; year: number}> = (
  props,
) => {
  return (
    <YearContext.Provider value={props.year}>
      {props.children}
    </YearContext.Provider>
  );
};

export const QuarterProvider: Component<{
  children: JSXElement;
  quarter: Quarter;
}> = (props) => {
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
