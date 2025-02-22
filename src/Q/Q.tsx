import {Component, createEffect, For, onCleanup} from 'solid-js';
import {styled} from 'solid-styled-components';
import {Month} from '../Month';
import {Rto} from '../Rto';
import {quarters} from '../constants';
import {onLoad, user} from '../store';
import {Ymd} from '../types';
import {SnapScroll} from './SnapScroll';
import {Today} from './Today';
import {useTypeSum} from './useTypeSum';

type Props = {
  /**
   * starts at 0
   */
  quarter: keyof typeof quarters;
} & Pick<Ymd, 'year'>;

const Container = styled.div({
  position: 'relative',
  height: '100%',
  width: '100%',
});

const getYms = ({year, quarter}: Props) => {
  const months = quarters[quarter];

  return months.map((month) => {
    return {
      month,
      // Quarter 4 of 2024 has January 2025
      year: month === 0 ? year + 1 : year,
    };
  });
};

export const Q: Component<Props> = (props) => {
  const yms = getYms(props);
  let unsub = () => {};

  createEffect(() => {
    unsub();

    if (user()) {
      unsub = onLoad(yms);
    }

    onCleanup(unsub);
  });

  const typeSum = useTypeSum(yms);

  return (
    <Container>
      <SnapScroll>
        <For each={yms}>{(ym) => <Month {...ym} />}</For>
      </SnapScroll>
      <Today />
      <Rto types={typeSum()} yms={yms} />
    </Container>
  );
};
