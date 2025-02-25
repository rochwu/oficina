import type { Component, JSX } from 'solid-js';
import { createEffect, Index, onMount, splitProps } from 'solid-js';
import { styled } from 'solid-styled-components';

import { months } from '../constants';
import { MonthProvider, useQuarter, YearProvider } from '../Context';
import { vars } from '../css';
import { getDays, getFirstDayOfWeek } from '../date';
import { Day } from '../Day';
import { setGridIndex, setVisibleQ, today, gridIndex } from '../store';
import type { Quarter, Ym } from '../types';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  height: '100%',
});

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: vars.gap,

  position: 'relative',
});

const Name = styled.div({
  textTransform: 'uppercase',
  position: 'absolute',
  transform: 'translateY(-100%)',
  width: '100%',
  textAlign: 'center',
});

type Props = { index: number } & Ym & JSX.HTMLAttributes<HTMLDivElement>;

export const Month: Component<Props> = (rawProps) => {
  const [props, elProps] = splitProps(rawProps, ['year', 'month', 'index']);
  const quarter = useQuarter();

  let ref!: HTMLDivElement;

  const firstWeekday = getFirstDayOfWeek(props);
  const days = getDays(props);

  const tiles = Array.from({ length: firstWeekday + days });

  onMount(() => {
    if (today().getMonth() === props.month) {
      ref.scrollIntoView({ behavior: 'instant' });
      setGridIndex(props.index);
    }

    createEffect(() => {
      if (gridIndex() === props.index) {
        ref.scrollIntoView({ behavior: 'smooth' });
        setVisibleQ(quarter as Quarter);
      }
    });
  });

  const name = () => {
    return `${months[props.month]}`;
  };

  return (
    <YearProvider year={props.year}>
      <MonthProvider month={props.month}>
        <Container ref={ref} data-month={props.month} {...elProps}>
          <Grid>
            <Name>{name()}</Name>
            <Index each={tiles}>
              {(_, index) => {
                let day = index - firstWeekday;
                day = day < 0 ? NaN : day;

                return <Day day={day} weekday={index % 7} />;
              }}
            </Index>
          </Grid>
        </Container>
      </MonthProvider>
    </YearProvider>
  );
};
