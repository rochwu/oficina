import {Component, Index, onMount} from 'solid-js';
import {styled} from 'solid-styled-components';
import {getDays, getFirstDayOfWeek} from '../date';
import {MonthProvider, YearProvider} from '../Context';
import {Day} from '../Day';
import {vars} from '../css';
import {Ym} from '../types';
import {today} from '../constants';

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

type Props = Ym;

const Name = styled.div({
  textTransform: 'uppercase',
  position: 'absolute',
  transform: 'translateY(-100%)',
  width: '100%',
  textAlign: 'center',
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((m) => m.substring(0, 4)); // Thought it'd be funny to be wonky 🤷‍♂️

export const Month: Component<Props> = (props) => {
  let ref!: HTMLDivElement;

  const firstWeekday = getFirstDayOfWeek(props);
  const days = getDays(props);

  const tiles = Array.from({length: firstWeekday + days});

  onMount(() => {
    if (today.getMonth() === props.month) {
      ref.scrollIntoView({behavior: 'instant'});
    }
  });

  return (
    <YearProvider year={props.year}>
      <MonthProvider month={props.month}>
        <Container ref={ref}>
          <Grid>
            <Name>{months[props.month]}</Name>
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
