import type { JSX } from 'solid-js';
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

export const Month = (props: Props) => {
  const [local, elProps] = splitProps(props, ['year', 'month', 'index']);
  const quarter = useQuarter();

  let ref!: HTMLDivElement;

  const firstWeekday = getFirstDayOfWeek(local);
  const days = getDays(local);

  const tiles = Array.from({ length: firstWeekday + days });

  onMount(() => {
    if (today().getMonth() === local.month) {
      ref.scrollIntoView({ behavior: 'instant' });
      setGridIndex(local.index);
    }

    createEffect(() => {
      if (gridIndex() === local.index) {
        ref.scrollIntoView({ behavior: 'smooth' });
        setVisibleQ(quarter as Quarter);
      }
    });
  });

  const name = () => {
    return `${months[local.month]}`;
  };

  return (
    <YearProvider year={local.year}>
      <MonthProvider month={local.month}>
        <Container ref={ref} data-index={local.index} {...elProps}>
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
