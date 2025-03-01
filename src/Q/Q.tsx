import { For } from 'solid-js';

import { QuarterProvider } from '../Context';
import { Month } from '../Month';
import type { Quarter, Ym } from '../types';

type Props = {
  quarter: Quarter;
  yms: Ym[];
  indices: [number, number, number];
};

export const Q = (props: Props) => {
  return (
    <QuarterProvider quarter={props.quarter}>
      <For each={props.yms}>
        {(ym, index) => <Month {...ym} index={props.indices[index()]!} />}
      </For>
    </QuarterProvider>
  );
};
