import {Component, createEffect, createMemo, For} from 'solid-js';
import {styled} from 'solid-styled-components';
import {Month} from '../Month';
import {quarters} from '../constants';
import {getWeekdays} from '../date';
import {store} from '../store';
import {load} from '../store/load';
import {DayType, Ym} from '../types';
import {useTypeSum} from './useTypeSum';
import {Rto} from './Rto';

type Props = {
  /**
   * starts at 0
   */
  quarter: number;
} & Ym;

const Container = styled.div({
  position: 'relative',
  height: '100%',
  width: '100%',
});

const SnapScroll = styled.div({
  height: '100%',
  width: '100%',

  scrollbarWidth: 'none',

  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
});

// Quarter 4 of 2024 has January 2025
const getYms = ({year, quarter}: Props) => {
  const months = quarters[quarter];

  return months.map((month) => {
    return {
      month,
      year: month === 0 ? year + 1 : year,
    };
  });
};

export const Q: Component<Props> = (props) => {
  const yms = getYms(props);

  createEffect(() => {
    const user = store.user;

    if (user) {
      load(yms);
    }
  });

  const typeSum = useTypeSum(yms);

  return (
    <Container>
      <SnapScroll>
        <For each={yms}>{(ym) => <Month {...ym} />}</For>
      </SnapScroll>
      <Rto types={typeSum()} yms={yms} />
    </Container>
  );
};
