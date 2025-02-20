import {Component, createEffect, createResource, For} from 'solid-js';
import {Ymd} from '../types';
import {Month} from '../Month';
import {quarters} from '../constants';
import {styled} from 'solid-styled-components';
import {load} from '../store/load';
import {store} from '../store';

type Props = {
  /**
   * starts at 0
   */
  quarter: number;
} & Pick<Ymd, 'year'>;

const Container = styled.div({
  height: '100%',
  width: '100%',

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

  return (
    <Container>
      <For each={yms}>{(ym) => <Month {...ym} />}</For>
    </Container>
  );
};
