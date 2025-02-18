import {Component, createContext, JSXElement, useContext} from 'solid-js';

const DayContext = createContext(NaN);
const MonthContext = createContext(NaN);
const YearContext = createContext(NaN);

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

export const useDay = () => useContext(DayContext);
export const useMonth = () => useContext(MonthContext);
export const useYear = () => useContext(YearContext);
