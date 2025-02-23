import {Component, createEffect, For, Show} from 'solid-js';
import {produce} from 'solid-js/store';
import {QuarterProvider} from '../Context';
import {Month} from '../Month';
import {Rto} from '../Rto';
import {setRtoByQ} from '../store/quarters';
import {Quarter, Ym} from '../types';
import {useLoad} from './useLoad';
import {useTypeSum} from './useTypeSum';

type Props = {
  current?: true;
  quarter: Quarter;
  yms: Ym[];
};

export const Q: Component<Props> = (props) => {
  useLoad(props.yms);

  const typeSum = useTypeSum(props.yms);

  createEffect(() => {
    setRtoByQ(
      produce((rto) => {
        rto[props.quarter] = typeSum();
      }),
    );
  });

  return (
    <QuarterProvider quarter={props.quarter}>
      <For each={props.yms}>
        {(ym) => (
          <Month {...ym} id={`q${props.quarter}-${ym.year}-${ym.month}`} />
        )}
      </For>
      <Show when={props.current}>
        <Rto types={typeSum()} yms={props.yms} />
      </Show>
    </QuarterProvider>
  );
};
