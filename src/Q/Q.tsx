import { createEffect, For, Show } from 'solid-js';
import { produce } from 'solid-js/store';

import { QuarterProvider } from '../Context';
import { Month } from '../Month';
import { Rto } from '../Rto';
import { setRtoByQ } from '../store';
import type { Quarter, Ym } from '../types';
import { useTypeSum } from './useTypeSum';

type Props = {
  current?: true;
  quarter: Quarter;
  yms: Ym[];
  indices: [number, number, number];
};

export const Q = (props: Props) => {
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
        {(ym, index) => <Month {...ym} index={props.indices[index()]!} />}
      </For>
      <Show when={props.current}>
        <Rto types={typeSum()} yms={props.yms} />
      </Show>
    </QuarterProvider>
  );
};
