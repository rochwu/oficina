import {Component, Index} from 'solid-js';
import {styled} from 'solid-styled-components';
import {getFirstWeekday} from '../getFirstWeekday';
import {getDays} from '../getDays';
import {MonthProvider, YearProvider} from '../Context';
import {Day} from '../Day';
import {vars} from '../css';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: vars.gap,
  // width: '100%',
  // padding: '0 8px',
  // boxSizing: 'border-box',
});

type Props = {
  year: number;
  month: number;
};

export const Month: Component<Props> = (props) => {
  const firstWeekday = getFirstWeekday(props);
  const days = getDays(props);

  const tiles = Array.from({length: firstWeekday + days});

  return (
    <YearProvider year={props.year}>
      <MonthProvider month={props.month}>
        <Grid>
          <Index each={tiles}>
            {(_, index) => {
              let day = index - firstWeekday;
              day = day < 0 ? NaN : day;

              return <Day day={day} weekday={index % 7} />;
            }}
          </Index>
        </Grid>
      </MonthProvider>
    </YearProvider>
  );
};
