import type {Component, JSX} from 'solid-js';
import {Index, onMount, splitProps} from 'solid-js';
import {styled} from 'solid-styled-components';

import {months} from '../constants';
import {MonthProvider, YearProvider} from '../Context';
import {vars} from '../css';
import {getDays, getFirstDayOfWeek} from '../date';
import {Day} from '../Day';
import {today} from '../store';
import type {Ym} from '../types';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  scrollSnapAlign: 'center',
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

type Props = Ym & JSX.HTMLAttributes<HTMLDivElement>;

export const Month: Component<Props> = (rawProps) => {
  const [props, elProps] = splitProps(rawProps, ['year', 'month']);

  let ref!: HTMLDivElement;

  const firstWeekday = getFirstDayOfWeek(props);
  const days = getDays(props);

  const tiles = Array.from({length: firstWeekday + days});

  onMount(() => {
    if (today().getMonth() === props.month) {
      ref.scrollIntoView({behavior: 'instant'});
    }
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
